import { useState, useEffect } from 'react'
import { formatTime } from '../utility'

const tempLog = [
  {
    date: new Date(),
    sessionNumber: 1,
    items: [
      {
        category: { name: 'deep', id: '1' },
        entries: [
          [new Date('2023-01-31T19:31:45.999Z'), new Date('2023-01-31T19:31:47.139Z')],
          [new Date('2023-01-31T19:31:47.737Z'), new Date('2023-01-31T19:31:48.872Z')],
          [new Date('2023-01-31T19:31:49.475Z'), new Date('2023-01-31T19:31:50.863Z')]
        ],
        totalTime: 3663
      }
    ]
  }
]

const Log = () => {
  const [log, setLog] = useState([])
  useEffect(() => {
    setLog(tempLog)
  }, [])
  return (
    <div>
      <h3>log</h3>
      {log.map((session) => {
        return (
          <div key={session.sessionNumber}>
            <h4>{session.sessionNumber}</h4> {session.date.toLocaleString()}
            {session.items.map((item) => {
              return (
                <div key={item.category.id}>
                  {item.category.name} - {formatTime(item.totalTime)}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Log
