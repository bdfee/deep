import { useState } from 'react'
import { useAudioContext } from '../utility/useAudioContext'
import {
  createAudioNodes,
  createPinkNoiseAudioBuffer,
  setAudioNodeParams,
  connectAudioNodes
} from '../utility/audioFunctions'

const MainOut = ({ gain, setGain, handleStart, handleStop, isActive, context, out }) => {
  // take in state parameters for ui

  const handleGain = (value) => {
    out.gain.linearRampToValueAtTime(value, context.currentTime + 0.1)
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

const PinkNoise = ({ params, trackParams, setParams, trackNodes, context }) => {
  const { id, gain, lowpassFreq, highpassFreq } = params

  const handleSetTracks = (e) => {
    const value = Number(e.target.value)
    const id = e.target.parentElement.id
    const property = e.target.name

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

const Parameters = ({ audio }) => {
  // everything that needs to be in state for an audio build, and start/stop handlers
  const [gain, setGain] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [trackParams, setTrackParams] = useState([
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

  const handleStart = () => {
    audio.graph.out.gain.value = gain

    trackParams.map((params) => {
      const track = (audio.graph.tracks[params.id] = {})
      createAudioNodes(track, audio)
      createPinkNoiseAudioBuffer(track, audio)
      setAudioNodeParams(track, params)
      connectAudioNodes(track, audio)
      track.audioSource.start()
    })

    setIsActive(true)
  }

  const handleStop = () => {
    Object.values(audio.graph.tracks).map((track) => track.audioSource.stop())
    setIsActive(false)
  }

  return (
    <div>
      <button
        onClick={() => {
          console.log(audio)
        }}>
        log state
      </button>
      <MainOut
        setGain={setGain}
        gain={gain}
        handleStart={handleStart}
        handleStop={handleStop}
        isActive={isActive}
        context={audio.context}
        out={audio.graph.out}
      />
      {trackParams.map((params) => {
        const key = params.id
        return (
          <PinkNoise
            key={key}
            params={params}
            trackParams={trackParams}
            setParams={setTrackParams}
            trackNodes={audio.graph.tracks[key]}
            context={audio.context}
          />
        )
      })}
    </div>
  )
}

const Audio = () => {
  // everything that doesn't get rebuilt on restart
  const audioContext = useAudioContext()
  const gainNode = audioContext.createGain()
  const audio = {
    context: audioContext,
    graph: {
      out: gainNode,
      tracks: {}
    }
  }

  return <Parameters audio={audio} />
}

export default Audio
