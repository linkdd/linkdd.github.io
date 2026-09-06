import { useState } from 'react'

import type { TableViewProps } from './types'


export default function TableView(props: TableViewProps) {
  const [highlighted, setHighlighted] = useState<number | null>(null)

  return (
    <div className="sunken-panel">
      <table>
        <thead>
          <tr>
            {props.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={highlighted === rowIndex ? 'highlighted' : ''}
              onClick={() => setHighlighted(rowIndex)}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
