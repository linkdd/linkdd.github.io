import { parse } from 'yaml'

import source from '/data/experiences.yaml?raw'

import type { ExperienceData } from './types'


const data: ExperienceData = parse(source)

export const experienceCategories = data.categories
export const experiences = data.entries
