import CountUp from './count-up'
import CountDown from './count-down'
import { useState, useEffect } from 'react'

const Timer = ({ createEntry, isRunning, setIsRunning }) => {
  const [isActive, setIsActive] = useState(false)
  const [entryStartTime, setEntryStartTime] = useState({})
  const [toggleCountDown, setToggleCountDown] = useState(false)

  useEffect(() => {
    !isRunning ? handleStopTimer() : handleStartTimer()
  }, [isRunning])

  const totalTimeInMs = () => new Date() - entryStartTime

  const handleStartTimer = () => {
    if (!isActive) {
      setEntryStartTime(new Date())
      setIsActive(true)
    }
  }

  const handleStopTimer = () => {
    if (isActive) {
      createEntry(entryStartTime)
      setIsRunning(false)
      setIsActive(false)
    }
  }

  return (
    <div>
      {!isActive ? (
        <button onClick={() => setToggleCountDown(!toggleCountDown)}>
          {toggleCountDown ? 'count down' : 'count up'}
        </button>
      ) : (
        ''
      )}
      {toggleCountDown ? (
        <CountDown
          isActive={isActive}
          handleStopTimer={handleStopTimer}
          totalTimeInMs={totalTimeInMs}
        />
      ) : (
        <CountUp />
      )}
    </div>
  )
}

export default Timer
