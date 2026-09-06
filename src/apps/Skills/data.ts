import { parse } from 'yaml'

import source from '/data/skills.yaml?raw'

import type { SkillGroup } from '@/apps/Skills/components/SkillsBrowser/types'


export const skills: SkillGroup[] = parse(source)
