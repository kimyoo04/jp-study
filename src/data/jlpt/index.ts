// JLPT content registry. Adding a level = import its bank and spread it here.
// Everything downstream (exam builder, home screen) reads from JLPT_POOL.

import type { JlptQuestion } from './types'
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

export * from './types'
