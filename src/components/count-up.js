import { useState, useRef } from 'react'

const Timer = () => {
  const [isActive, setIsActive] = useState(false)
  // set start time with a new date
  const [entryStart, setEntryStart] = useState({})
  // create an entry with start Date and stop Date into entries array, nested array to designate each entry
  const [entries, setEntries] = useState([])
  // store in ms
  const accruedTimeRef = useRef(0)

  const handleStartTimer = () => {
    if (!isActive) {
      setEntryStart(new Date())
      setIsActive(true)
    }
  }

  const handleStopTimer = () => {
    if (isActive) {
      accruedTimeRef.current = accruedTimeRef.current + (new Date() - entryStart)
      const newEntry = [[entryStart, new Date()]]
      setEntries(entries.concat(newEntry))
      setIsActive(false)
    }
  }

  const handleClearTimer = () => {
    setEntryStart({})
    accruedTimeRef.current = 0
    setIsActive(false)
  }

  const formatTime = (ms) => {
    return new Date(ms).toISOString().slice(11, 19)
  }

  return (
    <div>
      {!isActive ? (
        <>
          <button onClick={handleStartTimer}>start</button>
          {accruedTimeRef.current > 0 ? (
            <button onClick={handleClearTimer}>clear timer</button>
          ) : (
            ''
          )}
        </>
      ) : (
        <button onClick={handleStopTimer}>pause</button>
      )}
      <div>accrued {formatTime(accruedTimeRef.current)}</div>
    </div>
  )
}

export default Timer
