import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef } from 'react'
import type { PointerEvent } from 'react'

import Window from '@/components/base/Window'
import { fitBounds } from '@/components/os/windowManager'

import type { Bounds, DesktopWindowProps } from './types'

import { WindowFrame, ResizeHandle, AnimatedOutline } from './styled'


export default function DesktopWindow({
  app,
  window,
  active,
  layer,
  area,
  dispatch,
}: DesktopWindowProps) {
  const element = useRef<HTMLElement>(null)
  const outlineElement = useRef<HTMLDivElement>(null)
  const animations = useRef<Animation[]>([])
  const previous = useRef<{
    minimized: boolean
    maximized: boolean
    rect: { left: number; top: number; width: number; height: number }
  } | null>(null)
  const gesture = useRef<{
    x: number
    y: number
    bounds: Bounds
    resize: boolean
  } | null>(null)

  const bounds = fitBounds(window.bounds, area.width, area.height)

  const focus = () => dispatch({ type: 'focus', id: app.id })
  const maximize = () => dispatch({ type: 'maximize', id: app.id })

  useEffect(() => {
    if (active && !element.current?.contains(document.activeElement)) {
      element.current?.focus({ preventScroll: true })
    }
  }, [active])

  useLayoutEffect(() => {
    const frame = element.current
    const outline = outlineElement.current

    if (!frame || !outline) {
      return
    }

    const rect = frame.getBoundingClientRect()
    const current = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    }
    const before = previous.current

    previous.current = {
      minimized: window.minimized,
      maximized: window.maximized,
      rect: current,
    }

    const changed = !before
      || before.minimized !== window.minimized
      || before.maximized !== window.maximized

    if (!changed || globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    for (const animation of animations.current) {
      animation.cancel()
    }

    const task = document.querySelector(
      `[data-task-app="${CSS.escape(app.id)}"]`,
    )?.getBoundingClientRect()
    const taskRect = task
      ? { left: task.left, top: task.top, width: task.width, height: task.height }
      : { ...current, top: area.height, width: 120, height: 24 }
    const from = !before || before.minimized ? taskRect : before.rect
    const to = window.minimized ? taskRect : current
    const keyframe = (value: typeof current) => ({
      left: `${value.left}px`,
      top: `${value.top}px`,
      width: `${value.width}px`,
      height: `${value.height}px`,
      visibility: 'visible' as const,
    })
    const duration = 300

    const animation = outline.animate(
      [keyframe(from), keyframe(to)],
      { duration, easing: 'steps(12, end)' },
    )
    const reveal = frame.animate(
      [{ visibility: 'hidden' }, { visibility: 'hidden' }],
      { duration },
    )

    animations.current = [animation, reveal]
  })

  useEffect(() => {
    return () => {
      for (const animation of animations.current) {
        animation.cancel()
      }
    }
  }, [])

  function start(event: PointerEvent<HTMLElement>) {
    const target = event.target as HTMLElement
    const resize = !!target.closest('[data-resize-handle]')

    if (
      event.button !== 0 ||
      window.maximized ||
      (!resize && (!target.closest('.title-bar') || target.closest('button')))
    ) {
      return
    }

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)

    gesture.current = { x: event.clientX, y: event.clientY, bounds, resize }
  }

  function move(event: PointerEvent<HTMLElement>) {
    const current = gesture.current

    if (!current) {
      return
    }

    const dx = event.clientX - current.x
    const dy = event.clientY - current.y

    const next = current.resize
      ? {
          ...current.bounds,
          width: Math.min(
            area.width - current.bounds.x,
            Math.max(240, current.bounds.width + dx),
          ),
          height: Math.min(
            area.height - current.bounds.y,
            Math.max(140, current.bounds.height + dy),
          ),
        }
      : {
          ...current.bounds,
          x: current.bounds.x + dx,
          y: current.bounds.y + dy,
        }

    dispatch({
      type: 'bounds',
      id: app.id,
      bounds: fitBounds(next, area.width, area.height),
    })
  }

  return (
    <>
      {createPortal(<AnimatedOutline ref={outlineElement} aria-hidden="true" />, document.body)}

      <WindowFrame
        ref={element}
        role="dialog"
        aria-label={app.title}
        data-minimized={window.minimized}
        inert={window.minimized}
        aria-hidden={window.minimized}
        tabIndex={-1}
        style={{
          left: window.maximized ? 0 : bounds.x,
          top: window.maximized ? 0 : bounds.y,
          width: window.maximized ? area.width : bounds.width,
          height: window.maximized ? area.height : bounds.height,
          zIndex: layer,
        }}
        onPointerDownCapture={focus}
        onFocusCapture={() => {
          if (!active) {
            focus()
          }
        }}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={() => {
          gesture.current = null
        }}
        onPointerCancel={() => {
          gesture.current = null
        }}
        onLostPointerCapture={() => {
          gesture.current = null
        }}
        onDoubleClick={event => {
          const target = event.target as HTMLElement

          if (target.closest('.title-bar') && !target.closest('button')) {
            maximize()
          }
        }}
      >
        <Window
          titlebar={{
            text: app.title,
            inactive: !active,
            maximized: window.maximized,
            onMaximize: maximize,
            onRestore: maximize,
            onMinimize: () => dispatch({ type: 'minimize', id: app.id }),
            onClose: () => dispatch({ type: 'close', id: app.id }),
          }}
          statusbar={app.statusbar}
        >
          {app.content}
        </Window>

        {!window.maximized && (
          <ResizeHandle
            variant="flat"
            data-resize-handle
            aria-label={`Resize ${app.title}`}
            onKeyDown={event => {
              const delta = {
                ArrowRight: [16, 0],
                ArrowLeft: [-16, 0],
                ArrowDown: [0, 16],
                ArrowUp: [0, -16],
              }[event.key]

              if (!delta) {
                return
              }

              event.preventDefault()

              dispatch({
                type: 'bounds',
                id: app.id,
                bounds: fitBounds(
                  {
                    ...bounds,
                    width: Math.max(240, bounds.width + delta[0]),
                    height: Math.max(140, bounds.height + delta[1]),
                  },
                  area.width,
                  area.height,
                ),
              })
            }}
          />
        )}
      </WindowFrame>
    </>
  )
}
