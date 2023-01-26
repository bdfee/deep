import CountUp from './count-up'
import CountDown from './count-down'
import { useState, useRef } from 'react'

const tempCategoryList = ['deep', 'full stack open', 'space fight']
// TODO condition handlers for checking if selected category

const Timer = () => {
  const [isActive, setIsActive] = useState(false)
  const [log, setLog] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [entryStartTime, setEntryStartTime] = useState({})
  const [display, setDisplay] = useState('')
  const [toggleCountDown, setToggleCountDown] = useState(false)
  const accruedTimeMsRef = useRef(0)

  const totalTimeInMs = () => {
    if (isActive) return accruedTimeMsRef.current + (new Date() - entryStartTime)
    else return accruedTimeMsRef.current
  }

  const formatTime = (ms) => {
    return new Date(ms).toISOString().slice(11, 19)
  }

  const handleStartTimer = () => {
    if (!isActive) {
      setEntryStartTime(new Date())
      setIsActive(true)
    }
  }

  const createEntry = () => {
    const newEntry = [entryStartTime, new Date()]
    const isExistingCategory = log.filter((entry) => entry.category === selectedCategory)

    if (isExistingCategory.length) {
      setLog(
        log.map((item) => {
          if (item.category === selectedCategory) item.entries.push(newEntry)
          return item
        })
      )
    } else {
      const newLogItem = {
        category: selectedCategory,
        entries: [newEntry]
      }
      setLog(log.concat(newLogItem))
    }
  }

  const handleStopTimer = () => {
    if (isActive) {
      accruedTimeMsRef.current = totalTimeInMs()
      createEntry()
      setIsActive(false)
    }
  }

  const handleClearTimer = () => {
    setEntryStartTime({})
    accruedTimeMsRef.current = 0
    setIsActive(false)
  }

  const handleClearEntries = () => setLog([])
  const selectedStyle = { background: 'black', color: 'white' }

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
        log
        {tempCategoryList.map((category) => {
          const style = selectedCategory === category ? selectedStyle : null
          return (
            <button
              style={style}
              key={category}
              value={category}
              onClick={({ target }) => setSelectedCategory(target.value)}>
              {category}
            </button>
          )
        })}
      </div>
      <div>
        items
        {log.map(({ category, entries }) => {
          return (
            <ul key={category}>
              {category}
              {entries.map(([start, stop]) => (
                <li key={start}>{formatTime(stop - start)}</li>
              ))}
            </ul>
          )
        })}
        <button onClick={handleClearEntries}>clear entries</button>
      </div>
    </div>
  )
}

export default Timer
