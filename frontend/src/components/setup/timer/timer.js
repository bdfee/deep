import CountDown from './count-down'
import { useState, useEffect } from 'react'

const Timer = ({ createEntry, isRunning, setIsRunning }) => {
  const [isActive, setIsActive] = useState(false)
  const [entryStartTime, setEntryStartTime] = useState({})
  const [toggleCountDown, setToggleCountDown] = useState(true)
  const [timeInMins, setTimeInMins] = useState(1)

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
    <>
      {isActive ? (
        ''
      ) : (
        <div className="timer">
          <span>timer</span>
          <label className="switch">
            <input type="checkbox" onClick={() => setToggleCountDown(!toggleCountDown)}></input>
            <span className="slider round"></span>
          </label>
          {!toggleCountDown ? (
            <>
              <CountDown
                isActive={isActive}
                handleStopTimer={handleStopTimer}
                totalTimeInMs={totalTimeInMs}
                timeInMins={timeInMins}
                setTimeInMins={setTimeInMins}
              />
              `${timeInMins} ${timeInMins > 1 ? 'minutes' : 'minute'}`
            </>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  )
}

export default Timer
