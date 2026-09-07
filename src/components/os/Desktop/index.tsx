import { useEffect, useReducer, useRef, useState } from 'react'

import DesktopWindow from '@/components/os/DesktopWindow'
import DesktopShortcut from '@/components/os/DesktopShortcut'
import Taskbar from '@/components/os/Taskbar'
import { windowReducer } from '@/components/os/windowManager'

import type { DesktopApp, DesktopProps } from './types'

import { DesktopLayout, Workspace, Shortcuts } from './styled'

export type { DesktopApp, DesktopProps } from './types'

export default function Desktop({ apps, links, initialOpen = [] }: DesktopProps) {
  const workspace = useRef<HTMLDivElement>(null)

  const [area, setArea] = useState({ width: 0, height: 0 })

  const [windows, dispatch] = useReducer(windowReducer, initialOpen, ids =>
    [...new Set(ids)].flatMap((id, index) => {
      const app = apps.find(item => item.id === id)

      return app
        ? [
            {
              id,
              taskbarOrder: index,
              minimized: false,
              maximized: false,
              bounds: {
                x: 240 + index * 24,
                y: 40 + index * 24,
                width: app.initialSize?.width ?? 480,
                height: app.initialSize?.height ?? 320,
              },
            },
          ]
        : []
    }),
  )

  const visibleWindows = windows.filter(window =>
    apps.some(app => app.id === window.id),
  )

  const activeId = visibleWindows.findLast(window => !window.minimized)?.id

  const taskbarApps = [...visibleWindows]
    .sort((a, b) => a.taskbarOrder - b.taskbarOrder)
    .map(window => apps.find(app => app.id === window.id)!)

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect

      setArea({ width, height })
    })

    if (workspace.current) {
      observer.observe(workspace.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  function open(app: DesktopApp) {
    dispatch({
      type: 'open',
      id: app.id,
      bounds: {
        x: 120 + (windows.length % 6) * 24,
        y: 40 + (windows.length % 6) * 24,
        width: app.initialSize?.width ?? 480,
        height: app.initialSize?.height ?? 320,
      },
    })
  }

  function selectWindow(id: string) {
    dispatch({
      type: activeId === id ? 'minimize' : 'focus',
      id,
    })
  }

  return (
    <DesktopLayout>
      <Workspace ref={workspace} aria-label="Desktop">
        <Shortcuts>
          {apps.map(app => (
            <DesktopShortcut key={app.id} app={app} onOpen={open} />
          ))}
        </Shortcuts>

        {area.width > 0 &&
          visibleWindows.map((window, index) => (
            <DesktopWindow
              key={window.id}
              app={apps.find(app => app.id === window.id)!}
              window={window}
              active={activeId === window.id}
              layer={index + 1}
              area={area}
              dispatch={dispatch}
            />
          ))}
      </Workspace>

      <Taskbar
        links={links}
        openApps={taskbarApps}
        activeId={activeId}
        onSelect={selectWindow}
      />
    </DesktopLayout>
  )
}
