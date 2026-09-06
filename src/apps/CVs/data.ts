import { parse } from 'yaml'

import source from '/data/cvs.yaml?raw'


export type CVDefinition = {
  id: string
  title: string
  summary: string
  experienceIds: string[]
  skillCategoryIds: string[]
  projectNames: string[]
}

const definitions: CVDefinition[] = parse(source)

export const cvs = definitions.map(cv => ({
  id: cv.id,
  title: cv.title,
  file: `cvs/${cv.id}.pdf`,
}))
