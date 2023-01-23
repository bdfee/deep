const MainOutControls = ({ gain, setGain, handleStart, handleStop, isActive, context, out }) => {
  // handler (audio and state) and ui
  const handleGain = (value) => {
    // apply value directly to audio
    out.gain.linearRampToValueAtTime(value, context.currentTime + 0.1)
    // update state for ui and audio restart
    setGain(value)
  }

  return (
    <div>
      {!isActive ? (
        <button onClick={() => handleStart()}>start</button>
      ) : (
        <button onClick={() => handleStop()}>stop</button>
      )}
      <input
        value={gain}
        type="range"
        min={0}
        max={1}
        step={0.01}
        onChange={({ target }) => {
          handleGain(Number(target.value))
        }}></input>
    </div>
  )
}

export default MainOutControls
