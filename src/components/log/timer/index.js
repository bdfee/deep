import CountUp from './count-up'
import CountDown from './count-down'
import { useState, useRef, useEffect } from 'react'
import { formatTime } from '../log.helpers'

// TODO condition handlers for checking if selected category

const Timer = ({ createEntry, isRunning }) => {
  const [isActive, setIsActive] = useState(false)

  const [entryStartTime, setEntryStartTime] = useState({})
  const [display, setDisplay] = useState('')
  const [toggleCountDown, setToggleCountDown] = useState(false)
  const accruedTimeMsRef = useRef(0)

  useEffect(() => {
    !isRunning ? handleStopTimer() : handleStartTimer()
  }, [isRunning])

  const totalTimeInMs = () => {
    if (isActive) return accruedTimeMsRef.current + (new Date() - entryStartTime)
    else return accruedTimeMsRef.current
  }

  const handleStartTimer = () => {
    if (!isActive) {
      setEntryStartTime(new Date())
      setIsActive(true)
    }
  }

  const handleStopTimer = () => {
    if (isActive) {
      accruedTimeMsRef.current = totalTimeInMs()
      createEntry(entryStartTime)
      setIsActive(false)
    }
  }

  const handleClearTimer = () => {
    setEntryStartTime({})
    accruedTimeMsRef.current = 0
    setIsActive(false)
  }

  return (
    <div>
      <button onClick={() => setToggleCountDown(!toggleCountDown)}>toggle timer</button>
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
    </div>
  )
}

export default Timer
