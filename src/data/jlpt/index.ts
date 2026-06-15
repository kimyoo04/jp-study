// JLPT content registry. Adding a level = import its bank and spread it here.
// Everything downstream (exam builder, home screen) reads from JLPT_POOL.

import type { JlptLevel, JlptQuestion } from './types'
import { N5_QUESTIONS } from './n5'
import { N4_QUESTIONS } from './n4'
import { N3_QUESTIONS } from './n3'
import { N2_QUESTIONS } from './n2'

export const JLPT_POOL: JlptQuestion[] = [
  ...N5_QUESTIONS,
  ...N4_QUESTIONS,
  ...N3_QUESTIONS,
  ...N2_QUESTIONS,
]

// Order shown on the JLPT home screen (easiest first).
export const JLPT_LEVELS: JlptLevel[] = ['N5', 'N4', 'N3', 'N2']

export * from './types'
