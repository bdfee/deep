import { useState, useEffect } from 'react'
import PinkNoiseControls from './pink-noise-controls'
import MainOutControls from './main-out-controls'
import {
  createAudioNodes,
  createPinkNoiseAudioBuffer,
  setAudioNodeParams,
  connectAudioNodes
} from './audio.helpers'

// will try to one once on load, cannot initialize before user action per web audio
const audioContext = new AudioContext()
const gainNode = audioContext.createGain()
const audio = {
  context: audioContext,
  graph: {
    out: gainNode,
    tracks: {}
  }
}

const AudioParameters = ({ isRunning }) => {
  // state parameters of ui, values used to rebuild the audio object in handleStart and map the filter components
  const [gain, setGain] = useState(0.5)
  const [isActive, setIsActive] = useState(false)
  const [trackParams, setTrackParams] = useState([
    {
      id: 'lowPink',
      gain: 0.6,
      highpassFreq: 30,
      lowpassFreq: 60
    },
    {
      id: 'midPink',
      gain: 0.1,
      highpassFreq: 80,
      lowpassFreq: 300
    },
    {
      id: 'highPink',
      gain: 0.4,
      highpassFreq: 10000,
      lowpassFreq: 12000
    }
  ])

  const filterDefaults = {
    lowPink: {
      min: 0,
      max: 70
    },
    midPink: {
      min: 80,
      max: 5000
    },
    highPink: {
      min: 8000,
      max: 14000
    }
  }

  useEffect(() => {
    !isRunning ? handleStop() : handleStart()
  }, [isRunning])

  const handleStart = () => {
    audio.graph.out.gain.value = gain
    // map params from inital or user defined state into audio on start
    trackParams.map((params) => {
      const track = (audio.graph.tracks[params.id] = {})
      createAudioNodes(track, audio.context)
      createPinkNoiseAudioBuffer(track.audioSource, audio.context)
      setAudioNodeParams(track, params)
      connectAudioNodes(track, audio.graph.out, audio.context.destination)
      track.audioSource.start()
    })

    setIsActive(true)
  }

  const handleStop = () => {
    Object.values(audio.graph.tracks).map((track) => track.audioSource.stop())
    setIsActive(false)
  }

  const tempStyle = {
    background: '#feeee8',
    display: isRunning ? 'block' : 'none'
  }

  return (
    <div style={tempStyle}>
      <h2>pink noise</h2>
      <MainOutControls
        setGain={setGain}
        gain={gain}
        handleStart={handleStart}
        handleStop={handleStop}
        isActive={isActive}
        context={audio.context}
        out={audio.graph.out}
      />
      {trackParams.map((params) => {
        return (
          <PinkNoiseControls
            key={params.id}
            params={params}
            trackFilterDefaults={filterDefaults[params.id]}
            trackParams={trackParams}
            setParams={setTrackParams}
            trackNodes={audio.graph.tracks[params.id]}
            context={audio.context}
            isActive={isActive}
          />
        )
      })}
    </div>
  )
}

export default AudioParameters
