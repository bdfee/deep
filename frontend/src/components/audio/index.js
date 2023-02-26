import { useState, useEffect } from 'react'
import TracksGain from './tracks-gain'
import TracksFilter from './tracks-filter'
import MainOutControls from './main-out-controls'
import { isMobile } from 'react-device-detect'

import {
  createAudioNodes,
  createPinkNoiseAudioBuffer,
  setAudioNodeParams,
  connectAudioNodes
} from './audio.helpers'
import TracksFilterToggle from './tracks-filter-toggle'

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

const AudioParameters = ({ isRunning, showSection }) => {
  // state parameters of ui, values used to rebuild the audio object in handleStart and map the filter components
  const [gain, setGain] = useState(0.5)
  const [isActive, setIsActive] = useState(false)
  const [showFilter, setShowFilter] = useState('lowPink')
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
    display: showSection === 'audio' ? 'block' : 'none'
  }

  const mobileClass = isMobile ? '-mobile' : ''

  return (
    <div className="audio-controls" style={tempStyle}>
      <div className={`audio-tracks-container${mobileClass}`}>
        {trackParams.map((params) => {
          return (
            <div key={params.id}>
              <TracksGain
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                params={params}
                trackParams={trackParams}
                setParams={setTrackParams}
                trackNodes={audio.graph.tracks[params.id]}
                context={audio.context}
              />
            </div>
          )
        })}
      </div>
      <div className={`audio-filter-label-row${mobileClass}`}>
        {trackParams.map((params) => {
          return (
            <TracksFilterToggle
              key={params.id}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              params={params}
            />
          )
        })}
      </div>
      {trackParams.map((params) => {
        return (
          <div key={params.id}>
            <TracksFilter
              showFilter={showFilter}
              params={params}
              trackFilterDefaults={filterDefaults[params.id]}
              trackParams={trackParams}
              setParams={setTrackParams}
              trackNodes={audio.graph.tracks[params.id]}
              context={audio.context}
            />
          </div>
        )
      })}
      <MainOutControls
        setGain={setGain}
        gain={gain}
        handleStart={handleStart}
        handleStop={handleStop}
        isActive={isActive}
        context={audio.context}
        out={audio.graph.out}
      />
    </div>
  )
}

export default AudioParameters
