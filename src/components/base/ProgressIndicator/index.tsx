import clsx from 'clsx'

import type { ProgressIndicatorProps } from './types'


export default function ProgressIndicator(props: ProgressIndicatorProps) {
  return (
    <div className={clsx('progress-indicator', props.segmented && 'segmented')}>
      <div className="progress-indicator-bar" style={{ width: `${props.value * 100}%` }} />
    </div>
  )
}
