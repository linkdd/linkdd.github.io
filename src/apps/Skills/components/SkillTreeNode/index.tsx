import TreeView from '@/components/base/TreeView'

import type { SkillTreeNodeProps } from './types'

import { CategoryButton } from './styled'


export default function SkillTreeNode({
  node,
  selectedId,
  panelId,
  onSelect,
}: SkillTreeNodeProps) {
  if ('children' in node) {
    return (
      <TreeView.Section label={node.label} open>
        {node.children.map(child => (
          <SkillTreeNode
            key={child.id}
            node={child}
            selectedId={selectedId}
            panelId={panelId}
            onSelect={onSelect}
          />
        ))}
      </TreeView.Section>
    )
  }

  return (
    <TreeView.Item>
      <CategoryButton
        variant="flat"
        aria-pressed={selectedId === node.id}
        aria-controls={panelId}
        onClick={() => {
          onSelect(node.id)
        }}
      >
        {node.label}
      </CategoryButton>
    </TreeView.Item>
  )
}
