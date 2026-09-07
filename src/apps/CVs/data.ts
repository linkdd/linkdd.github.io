import { parse } from 'yaml'

import source from '/data/cvs.yaml?raw'

import type { CVDefinition } from './types'


const definitions: CVDefinition[] = parse(source)

export const cvs = definitions.map(cv => ({
  id: cv.id,
  title: cv.title,
  file: `cvs/${cv.id}.pdf`,
}))
