const ToggleStart = ({ isActive, handleStartTimer, handleStopTimer }) => {
  return !isActive ? (
    <button onClick={handleStartTimer}>start</button>
  ) : (
    <button onClick={handleStopTimer}>pause</button>
  )
}

export default ToggleStart
