import ToggleStart from './toggle-start'

const CountUp = ({ isActive, handleStartTimer, handleStopTimer }) => {
  return (
    <div>
      count up
      <ToggleStart
        isActive={isActive}
        handleStartTimer={handleStartTimer}
        handleStopTimer={handleStopTimer}
      />
    </div>
  )
}

export default CountUp
