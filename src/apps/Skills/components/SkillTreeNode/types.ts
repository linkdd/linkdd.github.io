import type { SkillNode } from '@/apps/Skills/components/SkillsBrowser/types'


export type SkillTreeNodeProps = {
  node: SkillNode
  selectedId?: string
  panelId: string
  onSelect: (id: string) => void
}
