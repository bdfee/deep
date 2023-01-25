import { useState, useRef, useEffect } from 'react'

const CountDown = () => {
  const [isActive, setIsActive] = useState(false)
  const [entryStart, setEntryStart] = useState({})
  const [entries, setEntries] = useState([])

  const [timeInMins, setTimeInMins] = useState(1)
  const [display, setDisplay] = useState('')
  const accruedTimeMsRef = useRef(0)
  const countToMsRef = useRef(null)

  // have two conditions and one that is wider range
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

  const totalTimeInMs = () => {
    if (isActive) return accruedTimeMsRef.current + (new Date() - entryStart)
    else return accruedTimeMsRef.current
  }

  const handleStartTimer = () => {
    if (!isActive) {
      countToMsRef.current = timeInMins * 60000 // conditioned on timer type
      setEntryStart(new Date())
      setIsActive(true)
    }
  }

  const handleStopTimer = () => {
    if (isActive) {
      accruedTimeMsRef.current = totalTimeInMs()
      const newEntry = [[entryStart, new Date()]]
      setEntries(entries.concat(newEntry))
      setIsActive(false)
    }
  }

  const handleClearTimer = () => {
    setEntryStart({})
    accruedTimeMsRef.current = 0
    countToMsRef.current = null // conditioned on timer type
    setIsActive(false)
  }

  const formatTime = (ms) => {
    return new Date(ms).toISOString().slice(11, 19)
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
      <button onClick={handleStartTimer}>start</button>
      <button onClick={handleStopTimer}>pause</button>
      <button onClick={handleClearTimer}>clear</button>
      {display.length ? <div>{display}</div> : null}
    </div>
  )
}

export default CountDown
