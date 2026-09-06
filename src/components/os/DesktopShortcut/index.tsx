import type { DesktopShortcutProps } from './types'

import { Shortcut, Icon } from './styled'


export default function DesktopShortcut({ app, onOpen }: DesktopShortcutProps) {
  return (
    <Shortcut onClick={() => onOpen(app)}>
      <Icon aria-hidden="true">
        {app.icon}
      </Icon>

      <span>{app.title}</span>
    </Shortcut>
  )
}
