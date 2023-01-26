const ToggleStart = ({ isActive, handleStartTimer, handleClearTimer, handleStopTimer }) => {
  return !isActive ? (
    <>
      <button onClick={handleStartTimer}>start</button>
      <button onClick={handleClearTimer}>clear timer</button>
    </>
  ) : (
    <button onClick={handleStopTimer}>pause</button>
  )
}

export default ToggleStart
