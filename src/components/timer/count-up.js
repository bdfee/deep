const CountUp = ({ isActive, handleStartTimer, handleStopTimer, handleClearTimer }) => {
  return (
    <div>
      {!isActive ? (
        <>
          <button onClick={handleStartTimer}>start</button>
          <button onClick={handleClearTimer}>clear timer</button>
        </>
      ) : (
        <button onClick={handleStopTimer}>pause</button>
      )}
    </div>
  )
}

export default CountUp
