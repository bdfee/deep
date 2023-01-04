import { useState } from 'react'
import PropTypes from 'prop-types'

const Stopwatch = () => {
  const [isActive, setIsActive] = useState(false)
  const [displayTime, setDisplayTime] = useState('')
  const [startTime, setStartTime] = useState({})
  const [stopTime, setStopTime] = useState({})

  const handleStartTime = () => {
    if (!isActive) {
      setStartTime(new Date())
      setIsActive(true)
    }
  }

  const handleStopTime = () => {
    if (isActive) {
      setStopTime(new Date())
      setIsActive(false)
    }
  }

  const handleBankTime = () => {
    setDisplayTime(formatDisplayTime(stopTime - startTime))
  }

  const handleClearTime = () => {
    setStartTime({})
    setStopTime({})
    setIsActive(false)
    setDisplayTime('')
  }

  const formatDisplayTime = (ms) => {
    return new Date(ms).toISOString().slice(11, 19)
  }

  const style = {
    border: '1px solid'
  }

  // TODO start stop one button
  return (
    <div style={style}>
      Stopwatch
      <div>{displayTime.length ? displayTime : ''}</div>
      <button onClick={handleStartTime}>start</button>
      <button onClick={handleStopTime}>stop</button>
      <button onClick={handleClearTime}>clear</button>
      <button onClick={handleBankTime}>bank</button>
    </div>
  )
}

export default Stopwatch

Stopwatch.propTypes = {
  currentTimeObj: PropTypes.object
}
