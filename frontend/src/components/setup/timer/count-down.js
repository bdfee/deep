import { useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'

const CountDown = ({ isActive, handleStopTimer, totalTimeInMs, timeInMins, setTimeInMins }) => {
  const countToMsRef = useRef()

  useEffect(() => {
    if (isActive) {
      countToMsRef.current = timeInMins * 60000
      const interval = setInterval(() => {
        if (totalTimeInMs() >= countToMsRef.current) {
          handleStopTimer()
        }
      }, 1000)
      return () => clearInterval(interval)
    } else {
      countToMsRef.current = 0
    }
  }, [isActive])

  const handleSetTime = (value) => {
    countToMsRef.current = value * 60000
    setTimeInMins(value)
  }

  const mobileClass = isMobile ? '-mobile' : ''

  return (
    <input
      className={`timer-range-container${mobileClass}`}
      orient="horizontal"
      type="range"
      min={1}
      max={120}
      step={1}
      value={timeInMins}
      onChange={({ target }) => {
        handleSetTime(target.value)
      }}></input>
  )
}

export default CountDown
