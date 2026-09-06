import { parse } from 'yaml'

import source from '/data/projects.yaml?raw'

import type { Project } from '@/apps/Projects/components/ProjectsTable/types'


export const projects: Project[] = parse(source)
