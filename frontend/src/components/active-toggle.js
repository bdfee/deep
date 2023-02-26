const ActiveToggle = ({
  selectedCategory,
  isRunning,
  setIsRunning,
  setShowSection,
  showSection
}) => {
  const handleStart = () => {
    setIsRunning(!isRunning)
    setShowSection(!isRunning ? 'audio' : '')
  }

  const style = { backgroundColor: 'black', color: 'white' }
  const stopStyle = { backgroundColor: 'red', color: 'white' }
  const startStyle = { backgroundColor: 'green', color: 'white' }
  if (selectedCategory) {
    return (
      <button
        className="start-btn"
        onClick={handleStart}
        style={isRunning ? stopStyle : startStyle}>
        {isRunning ? 'stop' : 'start'}
      </button>
    )
  } else {
    return (
      <button
        className="start-btn"
        onClick={() => setShowSection('')}
        style={showSection === '' ? style : null}>
        select category
      </button>
    )
  }
}

export default ActiveToggle
