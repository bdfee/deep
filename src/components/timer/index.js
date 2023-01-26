import CountUp from './count-up'
import CountDown from './count-down'
import { useState, useRef } from 'react'

const Timer = () => {
  const [isActive, setIsActive] = useState(false)
  const [entryStart, setEntryStart] = useState({})
  const [entries, setEntries] = useState([])
  const [display, setDisplay] = useState('')
  const [toggleCountDown, setToggleCountDown] = useState(false)
  const accruedTimeMsRef = useRef(0)

  const totalTimeInMs = () => {
    if (isActive) return accruedTimeMsRef.current + (new Date() - entryStart)
    else return accruedTimeMsRef.current
  }

  const formatTime = (ms) => {
    return new Date(ms).toISOString().slice(11, 19)
  }

  const handleStartTimer = () => {
    if (!isActive) {
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
    setIsActive(false)
  }

  const handleClearEntries = () => setEntries([])

  return (
    <div>
      <button onClick={() => setToggleCountDown(!toggleCountDown)}>toggle counter</button>
      <div>accrued time ref {formatTime(accruedTimeMsRef.current)}</div>
      {toggleCountDown ? (
        <CountDown
          isActive={isActive}
          setIsActive={setIsActive}
          handleStopTimer={handleStopTimer}
          handleStartTimer={handleStartTimer}
          handleClearTimer={handleClearTimer}
          display={display}
          setDisplay={setDisplay}
          formatTime={formatTime}
          totalTimeInMs={totalTimeInMs}
        />
      ) : (
        <CountUp
          isActive={isActive}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
          handleClearTimer={handleClearTimer}
        />
      )}
      <div>
        entries
        {entries.map(([start, stop]) => (
          <p key={start}>{formatTime(stop - start)}</p>
        ))}
        <button onClick={handleClearEntries}>clear entries</button>
      </div>
    </div>
  )
}

export default Timer
