import { useState } from 'react'

const Timer = () => {
  const [isActive, setIsActive] = useState(false)
  const [displayTime, setDisplayTime] = useState('')
  const [startTime, setStartTime] = useState({})
  const [stopTime, setStopTime] = useState({})

  const handleStartTime = () => {
    if (!isActive) {
      setStartTime(new Date())
      setIsActive(true)
    }
  }

  const handleStopTime = () => {
    if (isActive) {
      setStopTime(new Date())
      setIsActive(false)
    }
  }

  const handleBankTime = () => {
    setDisplayTime(formatDisplayTime(stopTime - startTime))
  }

  const handleClearTime = () => {
    setStartTime({})
    setStopTime({})
    setIsActive(false)
    setDisplayTime('')
  }

  const formatDisplayTime = (ms) => {
    return new Date(ms).toISOString().slice(11, 19)
  }

  // TODO start stop one button
  return (
    <div>
      stopwatch
      <div>{displayTime}</div>
      <button onClick={handleStartTime}>start</button>
      <button onClick={handleStopTime}>stop</button>
      <button onClick={handleClearTime}>clear</button>
      <button onClick={handleBankTime}>bank</button>
    </div>
  )
}

export default Timer
