import { useState, useEffect, useRef } from 'react'

const CountDown = ({ isActive, handleStopTimer, totalTimeInMs }) => {
  const countToMsRef = useRef()
  const [timeInMins, setTimeInMins] = useState(1)

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

  return (
    <div>
      <input
        type="range"
        min={1}
        max={120}
        step={1}
        value={timeInMins}
        onChange={({ target }) => {
          handleSetTime(target.value)
        }}></input>
      {timeInMins}
    </div>
  )
}

export default CountDown
