import { useState } from 'react'
import {
  createAudioNodes,
  createPinkNoiseAudioBuffer,
  setAudioNodeParams,
  connectAudioNodes
} from './utility/audioFunctions'
import PinkNoiseControls from './pink-noise-controls'
import MainOutControls from './main-out-controls'

const AudioParameters = ({ audio }) => {
  // everything that needs to be in state for audio build on start
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
    // map params from inital or user defined state into audio on start
    trackParams.map((params) => {
      // instantiate a track object within the graph.tracks object to store audio params, per track
      const track = (audio.graph.tracks[params.id] = {})
      // create the nodes on the track audio graph
      createAudioNodes(track, audio.context)
      // pass the audioSource to add a pink noise buffer
      createPinkNoiseAudioBuffer(track.audioSource, audio.context)
      // pass the track and state parameters
      setAudioNodeParams(track, params)
      // pass the track, the sole main out, and the context destination (speakers)
      connectAudioNodes(track, audio.graph.out, audio.context.destination)
      // start the track
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
        const key = params.id
        return (
          <PinkNoiseControls
            key={key}
            params={params}
            trackParams={trackParams}
            setParams={setTrackParams}
            trackNodes={audio.graph.tracks[key]}
            context={audio.context}
            isActive={isActive}
          />
        )
      })}
    </div>
  )
}

export default AudioParameters
