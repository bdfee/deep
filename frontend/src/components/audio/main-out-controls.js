import { isMobile } from 'react-device-detect'

const MainOutControls = ({ gain, setGain, handleStart, handleStop, isActive, context, out }) => {
  // handler (audio and state) and ui
  const handleGain = (value) => {
    // apply value directly to audio
    out.gain.linearRampToValueAtTime(value, context.currentTime + 0.1)
    // update state for ui and audio restart
    setGain(value)
  }

  const mobileClass = isMobile ? '-mobile' : ''

  return (
    <div className={`audio-main-out${mobileClass}`}>
      {!isActive ? (
        <button className={`audio-play-btn${mobileClass}`} onClick={() => handleStart()}>
          play
        </button>
      ) : (
        <button className={`audio-play-btn${mobileClass}`} onClick={() => handleStop()}>
          stop
        </button>
      )}

      <div className={`audio-horizontal-range-container${mobileClass}`}>
        <input
          value={gain}
          orient={`horizontal${mobileClass}`}
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={({ target }) => {
            handleGain(Number(target.value))
          }}></input>
      </div>
    </div>
  )
}

export default MainOutControls
