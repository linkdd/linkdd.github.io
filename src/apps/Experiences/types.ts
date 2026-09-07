import type { ExperienceProps } from '@/apps/Experiences/components/Experience/types'


export type ExperienceCategory = string

export type ExperienceEntry = ExperienceProps & {
  id: string
  documentName?: string
  category: ExperienceCategory | null
}

export type ExperienceData = {
  categories: ExperienceCategory[]
  entries: ExperienceEntry[]
}
