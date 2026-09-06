import Clock from '@/components/os/Clock'
import StartMenu from '@/components/os/StartMenu'

import type { TaskbarProps } from './types'

import { TaskbarLayout, Tasks, TaskButton, TaskIcon, TaskLabel } from './styled'


export default function Taskbar({
  links,
  openApps,
  activeId,
  onSelect,
}: TaskbarProps) {
  return (
    <TaskbarLayout aria-label="Taskbar">
      <StartMenu links={links} />

      <Tasks>
        {openApps.map(app => {
          const active = activeId === app.id

          return (
            <TaskButton
              variant="default"
              key={app.id}
              data-task-app={app.id}
              active={active}
              aria-pressed={active}
              title={app.title}
              onClick={() => onSelect(app.id)}
            >
              <TaskIcon aria-hidden="true">{app.icon}</TaskIcon>
              <TaskLabel>{app.title}</TaskLabel>
            </TaskButton>
          )
        })}
      </Tasks>

      <Clock />
    </TaskbarLayout>
  )
}
