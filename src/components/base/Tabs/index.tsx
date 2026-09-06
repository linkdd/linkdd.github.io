import { useState } from 'react'
import clsx from 'clsx'

import { Tab } from './styled'

import type { TabsProps } from './types'


export default function Tabs(props: TabsProps) {
  const [activeTab, setActiveTab] = useState<[number, number]>([0, 0])

  return (
    <>
      {props.tabs.map((tabRow, rowIndex) => (
        <menu
          key={rowIndex}
          role="tablist"
          className={clsx(props.tabs.length > 1 ? 'multirows' : '')}
        >
          {tabRow.map((tab, tabIndex) => (
            <Tab
              key={tabIndex}
              role="tab"
              aria-selected={activeTab[0] === rowIndex && activeTab[1] === tabIndex}
            >
              <a
                onClick={(evt) => {
                  evt.preventDefault()
                  setActiveTab([rowIndex, tabIndex])
                }}
              >
                {tab.title}
              </a>
            </Tab>
          ))}
        </menu>
      ))}
      <div className="window" role="tabpanel">
        <div className="window-body">
          {props.tabs[activeTab[0]][activeTab[1]].content}
        </div>
      </div>
    </>
  )
}
