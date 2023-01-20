import { useState } from 'react'
import { useAudioContext } from '../../utility/useAudioContext'

const MainOutControl = ({ audioData }) => {
  console.log(audioData)
  const audioContext = useAudioContext()
  const [mainGain, setMainGain] = useState(audioData.mainOut.gainNode.gain.value)
  const [isActive, setIsActive] = useState(false)

  const handleMainGain = (value) => {
    audioData.mainOut.gainNode.gain.linearRampToValueAtTime(value, audioContext.currentTime + 0.01)
    setMainGain(value)
  }

  const handleStart = () => {
    audioData.audioTracks.map((track) => {
      console.log(track)
      track.highpassFilter.connect(audioData.mainOut.gainNode)
      audioData.mainOut.gainNode.connect(audioContext.destination)
      track.audioSource.start()
    })
    setIsActive(true)
  }

  const handleStop = () => {
    audioData.audioTracks.map((track) => track.audioSource.stop())
    setIsActive(false)
  }
  return (
    <div>
      main out
      <input
        type="range"
        value={mainGain}
        min={0}
        max={0.7}
        step={0.01}
        onChange={({ target }) => handleMainGain(target.value)}></input>
      {Number(mainGain).toFixed(2)}
      {!isActive ? (
        <button onClick={() => handleStart()}>start</button>
      ) : (
        <button onClick={() => handleStop()}>stop</button>
      )}
    </div>
  )
}

export default MainOutControl
