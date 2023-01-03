import { useState, useEffect } from 'react'
import ClockDisplay from './clock-display'

const Clock = () => {
  const [currentTimeObj, setCurrentTimeObj] = useState(new Date())

  const refreshClock = () => setCurrentTimeObj(new Date())

  useEffect(() => {
    setInterval(refreshClock, 1000)
  })

  return (
    <div>
      <ClockDisplay currentTime={currentTimeObj} />
    </div>
  )
}

export default Clock
