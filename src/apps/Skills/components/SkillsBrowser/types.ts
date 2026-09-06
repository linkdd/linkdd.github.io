export type SkillTechnology = {
  name: string
  description: string
  source: string
}

export type SkillCategory = {
  id: string
  label: string
  technologies: SkillTechnology[]
}

export type SkillGroup = {
  id: string
  label: string
  children: SkillNode[]
}

export type SkillNode = SkillCategory | SkillGroup

export type SkillsBrowserProps = {
  groups: SkillGroup[]
}
