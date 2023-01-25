import { useState, useEffect, useRef } from 'react'

const CountDown = ({
  isActive,
  setIsActive,
  handleStartTimer,
  handleStopTimer,
  handleClearTimer,
  display,
  setDisplay,
  formatTime,
  totalTimeInMs
}) => {
  const countToMsRef = useRef(null)
  const [timeInMins, setTimeInMins] = useState(1)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        if (totalTimeInMs() >= countToMsRef.current) {
          setIsActive(false)
          setDisplay(`${formatTime(totalTimeInMs())} ${formatTime(countToMsRef.current)} complete`)
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
    if (isActive) {
      countToMsRef.current = null
      handleClearTimer()
    }
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
      <button onClick={handleStartAndRef}>start</button>
      <button onClick={handleStopTimer}>pause</button>
      <button onClick={handleClearAndRef}>clear</button>
      {display.length ? <div>{display}</div> : null}
    </div>
  )
}

export default CountDown
