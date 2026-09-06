import TitleBar from '@/components/base/TitleBar'

import type { WindowProps } from './types'


export default function Window(props: WindowProps) {
  return (
    <div className="window">
      <TitleBar {...props.titlebar} />
      <div className="window-body">
        {props.children}
      </div>
      {(props.statusbar !== undefined) ? (
        <div className="status-bar">
          {props.statusbar.map((field, index) => (
            <div key={index} className="status-bar-field">{field}</div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
