import { useState, useEffect } from 'react'
import Session from './session/index'
import AudioParameters from './audio/audio-parameters'
import Log from './log/index'
import logService from '../services/log'

// container toggles between form and playing status

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)
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
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'stop' : 'start'}</button>
      <AudioParameters isRunning={isRunning} />
      <Session isRunning={isRunning} setIsRunning={setIsRunning} setLog={setLog} log={log} />
      <Log log={log} />
    </div>
  )
}

export default Container
