#!/usr/bin/env python3
"""Build a 540-card kanji expansion from the KANJIDIC2 dictionary."""

from __future__ import annotations

import json
import re
import tempfile
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src/data/kanji.ts"
DICTIONARY = Path("/tmp/jp-study-kanjidic2.xml")
CHECKPOINT = Path(tempfile.gettempdir()) / "jp-study-kanji-meanings-gemma27b-v1.json"
OUTPUT = ROOT / "src/data/kanji-expanded.ts"
TARGET = 540


def parse_existing() -> set[str]:
    text = SOURCE.read_text()
    return set(re.findall(r"\{ kana: '([^']+)'", text))


def text_int(element: ET.Element | None, fallback: int) -> int:
    try:
        return int(element.text) if element is not None and element.text else fallback
    except ValueError:
        return fallback


def to_hiragana(value: str) -> str:
    return "".join(
        chr(ord(char) - 0x60) if "ァ" <= char <= "ヶ" else char
        for char in value
    )


def parse_candidates(existing: set[str]) -> list[dict]:
    candidates: list[dict] = []
    for _, character in ET.iterparse(DICTIONARY, events=("end",)):
        if character.tag != "character":
            continue
        literal = character.findtext("literal", "")
        grade = text_int(character.find("misc/grade"), 99)
        frequency = text_int(character.find("misc/freq"), 99999)
        strokes = text_int(character.find("misc/stroke_count"), 99)
        if (
            len(literal) != 1
            or not ("\u4e00" <= literal <= "\u9fff")
            or literal in existing
            or grade not in range(1, 9)
        ):
            character.clear()
            continue

        readings: list[str] = []
        for reading in character.findall("reading_meaning/rmgroup/reading"):
            if reading.attrib.get("r_type") not in {"ja_on", "ja_kun"}:
                continue
            value = (reading.text or "").strip()
            if value and value not in readings:
                readings.append(to_hiragana(value))
        meanings: list[str] = []
        for meaning in character.findall("reading_meaning/rmgroup/meaning"):
            if meaning.attrib.get("m_lang") not in {None, "en"}:
                continue
            value = (meaning.text or "").strip()
            if value and value not in meanings:
                meanings.append(value)
        if readings and meanings:
            candidates.append({
                "kanji": literal,
                "reading": "・".join(readings[:2]),
                "gloss": " / ".join(meanings[:3]),
                "grade": grade,
                "frequency": frequency,
                "strokes": strokes,
            })
        character.clear()
    candidates.sort(key=lambda item: (item["grade"], item["frequency"], item["strokes"], item["kanji"]))
    if len(candidates) < TARGET:
        raise RuntimeError(f"only {len(candidates)} eligible kanji; need {TARGET}")
    return candidates[:TARGET]


def ollama(body: dict) -> dict:
    request = urllib.request.Request(
        "http://127.0.0.1:11434/api/generate",
        data=json.dumps(body, ensure_ascii=False).encode(),
        headers={"content-type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=600) as response:
        return json.load(response)


def translate(candidates: list[dict]) -> dict[str, str]:
    try:
        translated: dict[str, str] = json.loads(CHECKPOINT.read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        translated = {}

    pending = [item for item in candidates if item["kanji"] not in translated]
    for offset in range(0, len(pending), 24):
        batch = pending[offset : offset + 24]
        inputs = [{"kanji": item["kanji"], "english": item["gloss"]} for item in batch]
        payload = ollama({
            "model": "gemma3:27b",
            "stream": False,
            "options": {"temperature": 0, "num_ctx": 8192, "num_predict": 1024},
            "prompt": (
                "/no_think\n일본어 한자 학습 카드의 영어 뜻을 간결하고 정확한 한국어로 번역하세요. "
                "각 meaning은 핵심 뜻 1~3개만 ' / '로 구분하고, 영어·일본어·설명문을 넣지 마세요. "
                "kanji는 입력 그대로 유지하고 입력 순서대로 JSON 배열만 반환하세요.\n"
                + json.dumps(inputs, ensure_ascii=False)
            ),
            "format": {
                "type": "array",
                "minItems": len(batch),
                "maxItems": len(batch),
                "items": {
                    "type": "object",
                    "required": ["kanji", "meaning"],
                    "additionalProperties": False,
                    "properties": {
                        "kanji": {"type": "string"},
                        "meaning": {"type": "string"},
                    },
                },
            },
        })
        results = json.loads(payload["response"])
        if len(results) != len(batch):
            raise RuntimeError(f"translation batch {offset} returned {len(results)} items")
        for expected, result in zip(batch, results, strict=True):
            if result.get("kanji") != expected["kanji"] or not re.search(r"[가-힣]", result.get("meaning", "")):
                raise RuntimeError(f"bad translation: expected {expected['kanji']}, got {result}")
            translated[expected["kanji"]] = result["meaning"].strip().rstrip(".")
        CHECKPOINT.write_text(json.dumps(translated, ensure_ascii=False, indent=2) + "\n")
        print(f"translated {min(offset + len(batch), len(pending))}/{len(pending)}", flush=True)
    return translated


def quote(value: str) -> str:
    return value.replace("\\", "\\\\").replace("'", "\\'")


def grade_label(grade: int) -> str:
    return f"교육한자 초{grade} 확장" if grade <= 6 else "교육한자 중학교 확장"


def write_output(candidates: list[dict], translations: dict[str, str]) -> None:
    # Candidates are already grade/frequency sorted. Global chunks avoid a
    # one-card remainder at grade boundaries while keeping adjacent difficulty.
    rows = [candidates[index : index + 8] for index in range(0, len(candidates), 8)]
    labels = [f"교육한자 학년·빈도 확장 {index + 1}" for index in range(len(rows))]

    lines = [
        "// Derived from KANJIDIC2 (EDRDG), CC BY-SA 4.0.",
        "// Sorted by Japanese school grade and newspaper frequency.",
        "import type { Kana } from './kana'",
        "",
        "export const KANJI_EXPANSION_ROWS: Kana[][] = [",
    ]
    for row in rows:
        lines.append("  [")
        for item in row:
            lines.append(
                "    { kana: '%s', romaji: '%s', meaning: '%s' },"
                % (quote(item["kanji"]), quote(item["reading"]), quote(translations[item["kanji"]]))
            )
        lines.append("  ],")
    lines.extend(["]", "", "export const KANJI_EXPANSION_CATS = ["])
    lines.extend(f"  '{quote(label)}'," for label in labels)
    lines.extend(["] as const", "",
        f"export const KANJI_EXPANSION_SOURCE_COUNT = {len(candidates)}", "",
    ])
    OUTPUT.write_text("\n".join(lines))


def main() -> None:
    if not DICTIONARY.exists():
        raise SystemExit(f"missing {DICTIONARY}; download KANJIDIC2 first")
    candidates = parse_candidates(parse_existing())
    if len({item["kanji"] for item in candidates}) != TARGET:
        raise RuntimeError("candidate kanji are not unique")
    translations = translate(candidates)
    write_output(candidates, translations)
    print(f"wrote {OUTPUT} with {len(candidates)} kanji", flush=True)


if __name__ == "__main__":
    main()
