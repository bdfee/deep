import { useState, useEffect, useRef } from 'react'
import ToggleStart from './toggle-start'
import { formatTime } from '../utility'

const CountDown = ({
  isActive,
  handleStartTimer,
  handleStopTimer,
  handleClearTimer,
  display,
  setDisplay,
  totalTimeInMs
}) => {
  const countToMsRef = useRef(null)
  const [timeInMins, setTimeInMins] = useState(1)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        if (totalTimeInMs() >= countToMsRef.current) {
          setDisplay(`${formatTime(countToMsRef.current)} complete`)
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
      {display.length ? <div>{display}</div> : null}
    </div>
  )
}

export default CountDown
