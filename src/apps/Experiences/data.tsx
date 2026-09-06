import { parse } from 'yaml'

import source from '/data/experiences.yaml?raw'

import type { ExperienceProps } from '@/apps/Experiences/components/Experience/types'


export type ExperienceCategory = string

export type ExperienceEntry = ExperienceProps & {
  id: string
  documentName?: string
  category: ExperienceCategory | null
}

const data: {
  categories: ExperienceCategory[]
  entries: ExperienceEntry[]
} = parse(source)

export const experienceCategories = data.categories
export const experiences = data.entries
