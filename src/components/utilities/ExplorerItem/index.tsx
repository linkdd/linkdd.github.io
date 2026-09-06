import type { ExplorerItemProps } from './types'

import { ItemButton } from './styled'


export default function ExplorerItem({ label, icon, onOpen }: ExplorerItemProps) {
  return (
    <ItemButton variant="flat"  onClick={onOpen}>
      <img src={icon} alt="" />

      <span>{label}</span>
    </ItemButton>
  )
}
