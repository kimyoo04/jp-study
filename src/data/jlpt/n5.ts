// N5 diagnostic question bank.
//
// Distractor authoring checklist (keep questions actually diagnostic):
//  - All 4 choices share the same category (all readings, all particles, all nouns).
//  - Choices are similar length — no "obviously the long/odd one out".
//  - No absurd or joke distractors; each wrong option must be a plausible mistake.
//  - `answer` is the index of the correct choice. buildExam() shuffles choice
//    order at runtime, so the authored position does not leak.
//
// Counts: vocab 8, grammar 8 (6 cloze + 2 ordering), reading 2 passages (2 sub
// each = 4 scored), listening 8  →  28 scored items.

import type { JlptQuestion } from './types'

export const N5_QUESTIONS: JlptQuestion[] = [
  // ---- 文字・語彙 (8) ----
  {
    id: 'n5-v1',
    level: 'N5',
    part: 'vocab',
    kind: 'kanji-reading',
    prompt: 'わたしは __学生__ です。',
    choices: ['がくせい', 'がくせ', 'かくせい', 'がくしょう'],
    answer: 0,
  },
  {
    id: 'n5-v2',
    level: 'N5',
    part: 'vocab',
    kind: 'kanji-reading',
    prompt: '毎日 __水__ を のみます。',
    choices: ['みづ', 'みず', 'すい', 'みす'],
    answer: 1,
  },
  {
    id: 'n5-v3',
    level: 'N5',
    part: 'vocab',
    kind: 'orthography',
    prompt: 'あの ひとは 「せんせい」 です。',
    choices: ['先生', '学生', '先王', '光生'],
    answer: 0,
  },
  {
    id: 'n5-v4',
    level: 'N5',
    part: 'vocab',
    kind: 'context',
    prompt: 'わたしは まいあさ コーヒーを (　　)。',
    choices: ['みます', 'のみます', 'たべます', 'ききます'],
    answer: 1,
  },
  {
    id: 'n5-v5',
    level: 'N5',
    part: 'vocab',
    kind: 'context',
    prompt: 'きょうは てんきが (　　) です。',
    choices: ['たかい', 'ながい', 'いい', 'おおきい'],
    answer: 2,
  },
  {
    id: 'n5-v6',
    level: 'N5',
    part: 'vocab',
    kind: 'paraphrase',
    prompt: 'この ほんは やさしいです。(≒)',
    choices: ['むずかしいです', 'かんたんです', 'おもしろいです', 'たかいです'],
    answer: 1,
  },
  {
    id: 'n5-v7',
    level: 'N5',
    part: 'vocab',
    kind: 'kanji-reading',
    prompt: '__日本__ へ いきます。',
    choices: ['にぽん', 'ひほん', 'にほん', 'にちほん'],
    answer: 2,
  },
  {
    id: 'n5-v8',
    level: 'N5',
    part: 'vocab',
    kind: 'context',
    prompt: 'えきまで バスで (　　) ます。',
    choices: ['たべ', 'いき', 'のみ', 'み'],
    answer: 1,
  },

  // ---- 文法 (8: 6 cloze + 2 ordering) ----
  {
    id: 'n5-g1',
    level: 'N5',
    part: 'grammar',
    kind: 'cloze',
    prompt: 'わたし (　　) がくせいです。',
    choices: ['を', 'は', 'に', 'へ'],
    answer: 1,
  },
  {
    id: 'n5-g2',
    level: 'N5',
    part: 'grammar',
    kind: 'cloze',
    prompt: 'ほん (　　) よみます。',
    choices: ['が', 'を', 'は', 'で'],
    answer: 1,
  },
  {
    id: 'n5-g3',
    level: 'N5',
    part: 'grammar',
    kind: 'cloze',
    prompt: 'がっこう (　　) いきます。',
    choices: ['を', 'が', 'へ', 'から'],
    answer: 2,
  },
  {
    id: 'n5-g4',
    level: 'N5',
    part: 'grammar',
    kind: 'cloze',
    prompt: 'つくえの うえ (　　) ねこが います。',
    choices: ['に', 'を', 'へ', 'と'],
    answer: 0,
  },
  {
    id: 'n5-g5',
    level: 'N5',
    part: 'grammar',
    kind: 'cloze',
    prompt: 'これは だれ (　　) かばんですか。',
    choices: ['が', 'を', 'の', 'に'],
    answer: 2,
  },
  {
    id: 'n5-g6',
    level: 'N5',
    part: 'grammar',
    kind: 'cloze',
    prompt: 'あした ともだち (　　) あいます。',
    choices: ['を', 'に', 'が', 'から'],
    answer: 1,
  },
  {
    id: 'n5-g7',
    level: 'N5',
    part: 'grammar',
    kind: 'ordering',
    prompt: 'わたしは まいにち ＿ ＿ ★ ＿ よみます。 (★に 入るのは?)',
    segments: ['としょかん', 'で', 'ほん', 'を'],
    choices: ['で', 'ほん', 'を', 'としょかん'],
    answer: 1,
  },
  {
    id: 'n5-g8',
    level: 'N5',
    part: 'grammar',
    kind: 'ordering',
    prompt: 'あの ＿ ＿ ★ ＿ おいしいです。 (★に 入るのは?)',
    segments: ['みせ', 'の', 'ケーキ', 'は'],
    choices: ['の', 'みせ', 'は', 'ケーキ'],
    answer: 3,
  },

  // ---- 読解 (2 passages, 2 sub each = 4) ----
  {
    id: 'n5-r1',
    level: 'N5',
    part: 'reading',
    passage:
      'わたしは まいあさ 6じに おきます。あさごはんを たべてから、7じはんに かいしゃへ いきます。ひるは いつも コンビニで パンを かいます。よるは うちで ごはんを つくります。',
    questions: [
      {
        prompt: 'この 人は あさ なんじに おきますか。',
        choices: ['6じ', '7じ', '7じはん', '12じ'],
        answer: 0,
      },
      {
        prompt: 'ひるごはんは どこで かいますか。',
        choices: ['かいしゃ', 'コンビニ', 'うち', 'レストラン'],
        answer: 1,
      },
    ],
  },
  {
    id: 'n5-r2',
    level: 'N5',
    part: 'reading',
    passage:
      'やまださんへ\nあしたの パーティーは ごご 5じから です。ばしょは えきの ちかくの レストランです。のみものは ありますが、たべものは すこしだけです。なにか たべものを もってきて ください。\nたなか',
    questions: [
      {
        prompt: 'パーティーは なんじから ですか。',
        choices: ['ごぜん 5じ', 'ごご 5じ', 'ごご 7じ', 'あさ 5じ'],
        answer: 1,
      },
      {
        prompt: 'たなかさんは やまださんに なにを たのみましたか。',
        choices: [
          'のみものを かう',
          'レストランを よやくする',
          'たべものを もってくる',
          '5じに くる',
        ],
        answer: 2,
      },
    ],
  },

  // ---- 聴解 (8) ----
  {
    id: 'n5-l1',
    level: 'N5',
    part: 'listening',
    script: 'では、かいぎは あしたの ごご 3じから です。',
    prompt: 'かいぎは いつ ですか。',
    choices: ['きょうの ごご3じ', 'あしたの ごご3じ', 'あしたの ごぜん3じ', 'あさって'],
    answer: 1,
  },
  {
    id: 'n5-l2',
    level: 'N5',
    part: 'listening',
    script: 'すみません、トイレは どこですか。 ── あちらの かいだんの となりです。',
    prompt: 'トイレは どこに ありますか。',
    choices: ['エレベーターの まえ', 'にかい', 'かいだんの となり', 'いりぐち'],
    answer: 2,
  },
  {
    id: 'n5-l3',
    level: 'N5',
    part: 'listening',
    script: 'わたしは いぬが すきですが、ねこは すきじゃ ありません。',
    prompt: 'この 人は なにが すきですか。',
    choices: ['ねこ', 'いぬ', 'いぬと ねこ', 'どうぶつ ぜんぶ'],
    answer: 1,
  },
  {
    id: 'n5-l4',
    level: 'N5',
    part: 'listening',
    script: 'コーヒーを ふたつ と こうちゃを ひとつ ください。',
    prompt: 'コーヒーは いくつ ですか。',
    choices: ['ひとつ', 'ふたつ', 'みっつ', 'よっつ'],
    answer: 1,
  },
  {
    id: 'n5-l5',
    level: 'N5',
    part: 'listening',
    script: 'あしたは あめ ですが、あさっては はれ でしょう。',
    prompt: 'あさっての てんきは どう ですか。',
    choices: ['あめ', 'くもり', 'はれ', 'ゆき'],
    answer: 2,
  },
  {
    id: 'n5-l6',
    level: 'N5',
    part: 'listening',
    script: 'えきまで あるいて 10ぷん くらい かかります。',
    prompt: 'えきまで どのくらい かかりますか。',
    choices: ['5ふん', '10ぷん', '20ぷん', '1じかん'],
    answer: 1,
  },
  {
    id: 'n5-l7',
    level: 'N5',
    part: 'listening',
    script: 'その ほんは つくえの うえ では なくて、はこの なかに あります。',
    prompt: 'ほんは どこに ありますか。',
    choices: ['つくえの うえ', 'はこの なか', 'かばんの なか', 'いすの した'],
    answer: 1,
  },
  {
    id: 'n5-l8',
    level: 'N5',
    part: 'listening',
    script: 'たなかさんは きょう やすみ です。あしたは きます。',
    prompt: 'たなかさんは きょう きますか。',
    choices: ['はい、きます', 'いいえ、きません', 'ごごに きます', 'わかりません'],
    answer: 1,
  },
]
