import { useState, useEffect, useRef } from 'react'
import ToggleStart from './toggle-start'

const CountDown = ({
  isActive,
  handleStartTimer,
  handleStopTimer,
  handleClearTimer,
  totalTimeInMs
}) => {
  const countToMsRef = useRef(null)
  const [timeInMins, setTimeInMins] = useState(1)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        if (totalTimeInMs() >= countToMsRef.current) {
          handleStopTimer()
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isActive])

  const handleStartAndRef = () => {
    if (!isActive) {
      countToMsRef.current = timeInMins * 60000
      handleStartTimer()
    }
  }

  const handleClearAndRef = () => {
    handleClearTimer()
    countToMsRef.current = null
  }

  return (
    <div>
      count down
      <input
        type="range"
        min={1}
        max={120}
        step={1}
        value={timeInMins}
        onChange={({ target }) => {
          setTimeInMins(target.value)
        }}></input>
      {timeInMins} minutes
      <ToggleStart
        isActive={isActive}
        handleStartTimer={handleStartAndRef}
        handleStopTimer={handleStopTimer}
        handleClearTimer={handleClearAndRef}
      />
    </div>
  )
}

export default CountDown
