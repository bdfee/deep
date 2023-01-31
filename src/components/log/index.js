import { useState, useEffect } from 'react'
import { formatTime } from '../utility'
import logService from '../../services/log'

const Log = () => {
  const [log, setLog] = useState([])
  useEffect(() => {
    try {
      logService.getAll().then((res) => {
        res.data.map((session) => {
          session.date = new Date(session.date)
          session.items.map((item) => {
            item.entries = item.entries.map(([start, stop]) => [new Date(start), new Date(stop)])
            return item
          })
        })
        setLog(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <div>
      <h2>log</h2>
      {log.map((session) => {
        return (
          <div key={session.id}>
            <h4>{session.id}</h4> {session.date.toLocaleString()}
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
