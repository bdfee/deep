import { useAudioContext } from '../../utility/useAudioContext'
import { useState } from 'react'

const PinkNoiseControl = ({ audioTrack }) => {
  const [gain, setGain] = useState(audioTrack.gainNode.gain.value)
  const [highpassFrequency, setHighpassFrequency] = useState(
    audioTrack.highpassFilter.frequency.value
  )
  const [lowpassFrequency, setLowpassFrequency] = useState(audioTrack.lowpassFilter.frequency.value)

  const audioContext = useAudioContext()

  const handleGain = (value) => {
    audioTrack.gainNode.gain.linearRampToValueAtTime(value, audioContext.currentTime + 0.01)
    setGain(value)
  }

  const handleLowpassFreq = (value) => {
    audioTrack.lowpassFilter.frequency.value = value
    setLowpassFrequency(value)
  }

  const handleHighpassFreq = (value) => {
    audioTrack.highpassFilter.frequency.value = value
    setHighpassFrequency(value)
  }

  return (
    <div>
      {audioTrack.id}
      <input
        type="range"
        onChange={({ target }) => handleGain(target.value)}
        step={0.01}
        min={0}
        max={0.7}
        value={gain}></input>
      {Number(gain).toFixed(2)}
      <input
        type="range"
        onChange={({ target }) => handleHighpassFreq(target.value)}
        step={1}
        min={0}
        max={20000}
        value={highpassFrequency}></input>
      {highpassFrequency}
      <input
        type="range"
        onChange={({ target }) => handleLowpassFreq(target.value)}
        step={1}
        min={0}
        max={16000}
        value={lowpassFrequency}></input>
      {lowpassFrequency}
    </div>
  )
}

export default PinkNoiseControl
