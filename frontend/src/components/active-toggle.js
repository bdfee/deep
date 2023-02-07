const ActiveToggle = ({ selectedCategory, isRunning, setIsRunning }) => {
  if (selectedCategory) {
    return <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'stop' : 'start'}</button>
  }
}

export default ActiveToggle
