import Button from '@/components/base/Button'

import Clock from '@/components/os/Clock'
import StartMenu from '@/components/os/StartMenu'

import type { TaskbarProps } from './types'

import { TaskbarLayout, Tasks } from './styled'


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
            <Button
              variant="default"
              key={app.id}
              data-task-app={app.id}
              className={active ? 'active' : ''}
              aria-pressed={active}
              title={app.title}
              onClick={() => onSelect(app.id)}
            >
              <span aria-hidden="true">{app.icon}</span> {app.title}
            </Button>
          )
        })}
      </Tasks>

      <Clock />
    </TaskbarLayout>
  )
}
