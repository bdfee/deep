import { useAudioContext } from '../utility/useAudioContext'
import { useState } from 'react'

const MainOut = ({ gain, setGain, handleStart, handleStop, isActive }) => {
  // take in state parameters for ui
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
          setGain(Number(target.value))
        }}></input>
    </div>
  )
}

const PinkNoise = ({ id, gain, lowpassFreq, highpassFreq, setTracks, tracks }) => {
  // take in state parameters for ui

  const handleSetTracks = (e) => {
    const value = Number(e.target.value)
    const id = e.target.parentElement.id
    const property = e.target.name
    const newState = tracks.map((track) => {
      if (track.id === id) track[property] = value
      return track
    })
    setTracks(newState)
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
          handleSetTracks(e)
        }}></input>
      <input
        min={20}
        max={16000}
        name={'lowpassFreq'}
        step={1}
        type="range"
        value={lowpassFreq}
        onChange={(e) => {
          handleSetTracks(e)
        }}></input>
      <input
        min={20}
        name={'highpassFreq'}
        max={16000}
        step={1}
        type="range"
        value={highpassFreq}
        onChange={(e) => {
          handleSetTracks(e)
        }}></input>
    </div>
  )
}

const Parameters = () => {
  // everything that needs to be in state for an audio build, and start/stop handlers
  const [gain, setGain] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [tracks, setTracks] = useState([
    {
      id: 'lowPink',
      gain: 0.5,
      lowpassFreq: 60,
      highpassFreq: 20
    },
    {
      id: 'midPink',
      gain: 0.1,
      lowpassFreq: 900,
      highpassFreq: 600
    },
    {
      id: 'highPink',
      gain: 0.4,
      lowpassFreq: 12000,
      highpassFreq: 9000
    }
  ])

  // const audioContext = useAudioContext()

  // const createAudioNodes = (track) => {
  //   track.audioSource = audioContext.createBufferSource()
  //   track.gainNode = audioContext.createGain()
  //   track.lowpassFilter = audioContext.createBiquadFilter()
  //   track.highpassFilter = audioContext.createBiquadFilter()
  // }

  // const generateAudioBuffer = (track) => {
  //   const bufferSize = 5 * audioContext.sampleRate
  //   const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  //   const output = buffer.getChannelData(0)

  //   let b0 = 0
  //   let b1 = 0
  //   let b2 = 0
  //   let b3 = 0
  //   let b4 = 0
  //   let b5 = 0
  //   let b6 = 0

  //   for (let i = 0; i < bufferSize; i++) {
  //     const white = Math.random() * 2 - 1
  //     b0 = 0.99886 * b0 + white * 0.0555179
  //     b1 = 0.99332 * b1 + white * 0.0750759
  //     b2 = 0.969 * b2 + white * 0.153852
  //     b3 = 0.8665 * b3 + white * 0.3104856
  //     b4 = 0.55 * b4 + white * 0.5329522
  //     b5 = -0.7616 * b5 - white * 0.016898
  //     output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
  //     output[i] *= 0.11
  //     b6 = white * 0.115926
  //   }

  //   track.audioSource.buffer = buffer
  // }

  // const setAudioNodeParams = (track) => {
  //   track.gainNode.gain.value = params.gain
  //   track.audioSource.loop = true
  //   track.lowpassFilter.type = 'lowpass'
  //   track.lowpassFilter.frequency.value = params.lowpassFreq
  //   track.highpassFilter.type = 'highpass'
  //   track.highpassFilter.frequency.value = params.highpassFreq
  // }

  // const connectAudioNodes = (track) => {
  //   track.audioSource.connect(track.gainNode)
  //   track.gainNode.connect(track.lowpassFilter)
  //   track.lowpassFilter.connect(track.highpassFilter)
  // }

  const handleStart = () => {
    // createAudioNodes(audioTrack)
    // generateAudioBuffer(audioTrack)
    // setAudioNodeParams(audioTrack)
    // connectAudioNodes(audioTrack)
    setIsActive(true)
    console.log('start')
  }

  const handleStop = () => {
    setIsActive(false)
    console.log('stop')
  }

  return (
    <div>
      <button
        onClick={() => {
          console.log({ tracks, gain, isActive })
        }}>
        log state
      </button>
      <MainOut
        setGain={setGain}
        gain={gain}
        handleStart={handleStart}
        handleStop={handleStop}
        isActive={isActive}
      />
      {tracks.map((track) => (
        <PinkNoise
          key={track.id}
          id={track.id}
          gain={track.gain}
          lowpassFreq={track.lowpassFreq}
          highpassFreq={track.highpassFreq}
          tracks={tracks}
          setTracks={setTracks}
        />
      ))}
    </div>
  )
}

const Audio = () => {
  // everything that doesn't get rebuilt on restart
  const audioContext = useAudioContext()

  const audio = {
    context: audioContext,
    out: audioContext.createGain(),
    tracks: []
  }

  console.log('Audio', audio)
  return <Parameters audio={audio} />
}

export default Audio
