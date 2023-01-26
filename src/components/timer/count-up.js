import ToggleStart from './toggle-start'

const CountUp = ({ isActive, handleStartTimer, handleStopTimer, handleClearTimer }) => {
  return (
    <div>
      <ToggleStart
        isActive={isActive}
        handleStartTimer={handleStartTimer}
        handleStopTimer={handleStopTimer}
        handleClearTimer={handleClearTimer}
      />
    </div>
  )
}

export default CountUp
