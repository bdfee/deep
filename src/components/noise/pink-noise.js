import { useRef, useState } from 'react'
import { useAudioContext } from '../utility/useAudioContext'

const PinkNoise = () => {
  const audioContext = useAudioContext()

  const [gain, setGain] = useState(0.3)
  const [isActive, setIsActive] = useState(false)
  const noise = useRef({})

  const generateAudioBuffer = (noise) => {
    const bufferSize = 2 * audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const output = buffer.getChannelData(0)

    let b0 = 0
    let b1 = 0
    let b2 = 0
    let b3 = 0
    let b4 = 0
    let b5 = 0
    let b6 = 0

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.969 * b2 + white * 0.153852
      b3 = 0.8665 * b3 + white * 0.3104856
      b4 = 0.55 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.016898
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      output[i] *= 0.11
      b6 = white * 0.115926
    }

    noise.audioSource.buffer = buffer
  }

  const createAudioNodes = (noise) => {
    noise.audioSource = audioContext.createBufferSource()
    noise.gainNode = audioContext.createGain()
  }

  const setAudioNodeParams = (noise) => {
    noise.gainNode.gain.value = gain
    noise.audioSource.loop = true
  }

  const connectAudioNodes = (noise) => {
    noise.audioSource.connect(noise.gainNode)
    noise.gainNode.connect(audioContext.destination)
  }

  const play = (noise) => {
    console.log(noise)
    createAudioNodes(noise)
    generateAudioBuffer(noise)
    setAudioNodeParams(noise)
    connectAudioNodes(noise)
    noise.audioSource.start()
    setIsActive(true)
  }

  const stop = (noise) => {
    noise.audioSource.stop()
    setIsActive(false)
  }

  const volume = (noise, e) => {
    setGain(e.target.value)
    noise.gainNode.gain.linearRampToValueAtTime(e.target.value, audioContext.currentTime + 0.01)
  }

  return (
    <div>
      {!isActive ? (
        <button onClick={() => play(noise.current)}>start</button>
      ) : (
        <button onClick={() => stop(noise.current)}>stop</button>
      )}
      <input
        type="range"
        onChange={(e) => volume(noise.current, e)}
        step={0.01}
        min={0}
        max={0.7}
        value={gain}></input>
    </div>
  )
}

export default PinkNoise
