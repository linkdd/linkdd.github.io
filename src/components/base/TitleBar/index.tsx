import clsx from 'clsx'

import type { MaximizableTitleBarProps, TitleBarProps } from './types'


export default function TitleBar(props: TitleBarProps) {
  return (
    <div className={clsx(
      'title-bar',
      (props.inactive ?? false) ? 'inactive' : '',
    )}>
      <div className="title-bar-text">{props.text}</div>

      <div className="title-bar-controls">
        {props.onHelp && (
          <button
            className="help"
            aria-label="Help"
            onClick={props.onHelp}
          />
        )}
        {props.onMinimize && (
          <button
            className="minimize"
            aria-label="Minimize"
            onClick={props.onMinimize}
          />
        )}
        {(props.maximizable ?? true) ? (
          (props as MaximizableTitleBarProps).maximized ? (
            <button
              className="restore"
              aria-label="Restore"
              onClick={(props as MaximizableTitleBarProps).onRestore}
            />
          ) : (
            <button
              className="maximize"
              aria-label="Maximize"
              onClick={(props as MaximizableTitleBarProps).onMaximize}
            />
          )
        ) : (
          <button
            className="maximize"
            aria-label="Maximize"
            disabled
          />
        )}
        {props.onClose && (
          <button
            className="close"
            aria-label="Close"
            onClick={props.onClose}
          />
        )}
      </div>
    </div>
  )
}
