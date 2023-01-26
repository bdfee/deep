const PinkNoiseControls = ({ params, trackParams, setParams, trackNodes, context }) => {
  // handler (audio and state) and ui
  const { id, gain, lowpassFreq, highpassFreq } = params

  const handleSetParams = (e) => {
    const value = Number(e.target.value)
    const id = e.target.parentElement.id
    const property = e.target.name
    // apply value directly to audio
    if (trackNodes !== undefined) {
      switch (property) {
        case 'gain':
          trackNodes.gainNode.gain.linearRampToValueAtTime(value, context.currentTime + 0.01)
          break
        case 'lowpassFreq':
          trackNodes.lowpassFilter.frequency.value = value
          break
        case 'highpassFreq':
          trackNodes.highpassFilter.frequency.value = value
          break
      }
    }

    // update state for ui and audio restart
    const newState = trackParams.map((track) => {
      if (track.id === id) track[property] = value
      return track
    })
    setParams(newState)
  }

  return (
    <div id={id}>
      {id}
      <input
        type="range"
        name={'gain'}
        min={0}
        max={0.7}
        step={0.01}
        value={gain}
        onChange={(e) => {
          handleSetParams(e)
        }}></input>{' '}
      gain: {gain}
      <input
        min={20}
        max={16000}
        name={'lowpassFreq'}
        step={1}
        type="range"
        value={lowpassFreq}
        onChange={(e) => {
          handleSetParams(e)
        }}></input>{' '}
      lowpass: {lowpassFreq}
      <input
        min={20}
        name={'highpassFreq'}
        max={16000}
        step={1}
        type="range"
        value={highpassFreq}
        onChange={(e) => {
          handleSetParams(e)
        }}></input>{' '}
      highpass: {highpassFreq}
    </div>
  )
}

export default PinkNoiseControls
