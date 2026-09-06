import type { SkillCategory, SkillNode } from './types'


export function getSkillCategories(nodes: SkillNode[]): SkillCategory[] {
  return nodes.flatMap(node => {
    if ('children' in node) {
      return getSkillCategories(node.children)
    }

    return [node]
  })
}
