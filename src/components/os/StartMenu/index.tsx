import { useEffect, useRef, useState } from 'react'

import WindowsUrl from '@/assets/icons/windows.png'

import type { StartMenuProps } from './types'
import { StartArea, StartButton, StartMenuPanel, ProfileLink, Brand } from './styled'


export default function StartMenu({ links }: StartMenuProps) {
  const startArea = useRef<HTMLDivElement>(null)
  const startButton = useRef<HTMLButtonElement>(null)

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    startArea.current
      ?.querySelector<HTMLAnchorElement>('nav a')
      ?.focus()

    const dismiss = (event: globalThis.PointerEvent) => {
      if (!startArea.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', dismiss)

    return () => document.removeEventListener('pointerdown', dismiss)
  }, [menuOpen])

  return (
    <StartArea
      ref={startArea}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          setMenuOpen(false)
          startButton.current?.focus()
        }
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setMenuOpen(false)
        }
      }}
    >
      <StartButton
        variant="default"
        ref={startButton}
        active={menuOpen}
        aria-expanded={menuOpen}
        aria-controls="desktop-start-menu"
        onClick={() => setMenuOpen(value => !value)}
      >
        <img src={WindowsUrl} height="16" alt="" />
        <strong>Start</strong>
      </StartButton>

      <StartMenuPanel
        className="window"
        id="desktop-start-menu"
        aria-label="Profiles"
        data-open={menuOpen}
        inert={!menuOpen}
        aria-hidden={!menuOpen}
      >
        <Brand>
          David Delassus
        </Brand>

        <div>
          {links.map(link => (
            <ProfileLink
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <img src={link.icon} alt="" />
              {link.title}
            </ProfileLink>
          ))}
        </div>
      </StartMenuPanel>
    </StartArea>
  )
}
