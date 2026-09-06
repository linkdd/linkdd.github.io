import type { TreeViewProps, TreeViewItemProps, TreeViewSectionProps } from './types'


export default function TreeView(props: TreeViewProps) {
  return (
    <ul className="tree-view">
      {props.children}
    </ul>
  )
}


function TreeViewItem(props: TreeViewItemProps) {
  return <li>{props.children}</li>
}


function TreeViewSection(props: TreeViewSectionProps) {
  return (
    <li>
      <details open={props.open ?? false}>
        <summary>{props.label}</summary>
        <ul>
          {props.children}
        </ul>
      </details>
    </li>
  )
}


TreeView.Item = TreeViewItem
TreeView.Section = TreeViewSection
