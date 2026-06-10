import { describe, expect, it } from 'vitest'
import { kanaToHangul } from './hangul'
import { PHRASES } from '../data/phrases'

describe('kanaToHangul', () => {
  it('converts basic phrases', () => {
    expect(kanaToHangul('はじめまして')).toBe('하지메마시테')
    expect(kanaToHangul('おはようございます')).toBe('오하요우고자이마스')
    expect(kanaToHangul('いくらですか')).toBe('이쿠라데스카')
  })

  it('handles sokuon (っ) as ㅅ받침 by default', () => {
    expect(kanaToHangul('ちょっと')).toBe('촛토')
    expect(kanaToHangul('まっすぐ')).toBe('맛스구')
    expect(kanaToHangul('いってきます')).toBe('잇테키마스')
  })

  it('assimilates っ to ㄱ before か행 and ㅂ before ぱ/ば행', () => {
    expect(kanaToHangul('ゆっくり')).toBe('육쿠리')
    expect(kanaToHangul('けっこうです')).toBe('켁코우데스')
    expect(kanaToHangul('いっぱい')).toBe('입파이')
    expect(kanaToHangul('しょっぱいです')).toBe('숍파이데스')
  })

  it('handles ん as ㄴ받침 by default', () => {
    expect(kanaToHangul('すみません')).toBe('스미마센')
    expect(kanaToHangul('おねがいします')).toBe('오네가이시마스')
    expect(kanaToHangul('なんですか')).toBe('난데스카')
    expect(kanaToHangul('でんわ')).toBe('덴와')
  })

  it('assimilates ん to ㅇ before か/が행 and ㅁ before ま/ば/ぱ행', () => {
    expect(kanaToHangul('おげんきですか')).toBe('오겡키데스카')
    expect(kanaToHangul('ばんごう')).toBe('방고우')
    expect(kanaToHangul('しんぱいです')).toBe('심파이데스')
    expect(kanaToHangul('ぜんぶ')).toBe('젬부')
    expect(kanaToHangul('がんばって ください')).toBe('감밧테 쿠다사이')
  })

  it('handles digraphs', () => {
    expect(kanaToHangul('だいじょうぶです')).toBe('다이조우부데스')
    expect(kanaToHangul('じゅう')).toBe('주우')
    expect(kanaToHangul('りょこう')).toBe('료코우')
  })

  it('handles katakana and long vowel mark', () => {
    expect(kanaToHangul('メニューを ください')).toBe('메뉴-오 쿠다사이')
    expect(kanaToHangul('タクシー')).toBe('타쿠시-')
    expect(kanaToHangul('カードで はらえますか')).toBe('카-도데 하라에마스카')
  })

  it('keeps spaces and converts punctuation', () => {
    expect(kanaToHangul('すみません、おくれます')).toBe('스미마센, 오쿠레마스')
  })

  it('converts every phrase in the deck without leftover kana', () => {
    for (const p of PHRASES) {
      const r = kanaToHangul(p.kana)
      expect(r, `unconverted chars in "${p.kana}" → "${r}"`).not.toMatch(
        /[぀-ゟ゠-ヿ]/,
      )
    }
  })
})
