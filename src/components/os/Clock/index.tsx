import { useEffect, useState } from 'react'

import { ClockDisplay } from './styled'


export default function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(
    () => {
      const timer = globalThis.setInterval(
        () => setNow(new Date()),
        1000,
      )

      return () => clearInterval(timer)
    },
    [],
  )

  return (
    <ClockDisplay
      className="status-field-border"
      dateTime={now.toISOString()}
      title={now.toLocaleDateString()}
    >
      {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </ClockDisplay>
  )
}
