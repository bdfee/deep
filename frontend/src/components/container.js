import { useState, useEffect } from 'react'
import Session from './session/index'
import Audio from './audio/index'
import Log from './log/index'
import logService from '../services/log'
import { createDateObjs } from './utility'
// container toggles between form and playing status

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [log, setLog] = useState([])

  useEffect(() => {
    logService.getAll().then((res) => {
      const response = res.data.map((session) => {
        session.items.map((item) => {
          item.entries = item.entries.map((entry) => createDateObjs(entry))
        })
        return session
      })
      setLog(response)
    })
  }, [])

  return (
    <div>
      {selectedCategory ? (
        <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'stop' : 'start'}</button>
      ) : (
        ''
      )}
      <Audio isRunning={isRunning} />
      <Session
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setLog={setLog}
        log={log}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Log log={log} />
    </div>
  )
}

export default Container
