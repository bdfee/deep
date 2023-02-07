const ActiveToggle = ({ selectedCategory, isRunning, setIsRunning, setShowSection }) => {
  const handleStart = () => {
    setIsRunning(!isRunning)
    setShowSection(!isRunning ? 'audio' : '')
  }

  if (selectedCategory) {
    return <button onClick={handleStart}>{isRunning ? 'stop' : 'start'}</button>
  }
}

export default ActiveToggle
