import { useAudioContext } from '../utility/useAudioContext'
import { useState } from 'react'

const MainOut = ({ gain, setGain, handleStart, handleStop, isActive }) => {
  // ui elements for main out
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

const PinkNoise = ({ params, setParams }) => {
  // take in state parameters, create and populate audio graph, connect to main out

  return (
    <div id={params.id}>
      {params.id}
      <input
        type="range"
        min={0}
        max={0.7}
        step={0.01}
        value={params.gain}
        onChange={({ target }) => {
          setParams({ ...params, gain: Number(target.value) })
        }}></input>
      <input
        min={20}
        max={16000}
        step={1}
        type="range"
        value={params.lowpassFreq}
        onChange={({ target }) => {
          setParams({ ...params, lowpassFreq: Number(target.value) })
        }}></input>
      <input
        min={20}
        max={16000}
        step={1}
        type="range"
        value={params.highpassFreq}
        onChange={({ target }) => {
          setParams({ ...params, highpassFreq: Number(target.value) })
        }}></input>
    </div>
  )
}

const Parameters = () => {
  // everything that needs to be in state for an audio build, and start/stop handlers
  const [gain, setGain] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [lowPink, setLowPink] = useState({
    id: 'lowPink',
    gain: 0.5,
    lowpassFreq: 60,
    highpassFreq: 20
  })

  const [midPink, setMidPink] = useState({
    id: 'midPink',
    gain: 0.1,
    lowpassFreq: 900,
    highpassFreq: 600
  })

  const [highPink, setHighPink] = useState({
    id: 'highPink',
    gain: 0.4,
    lowpassFreq: 12000,
    highpassFreq: 9000
  })

  const handleStart = () => {
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
          console.log({ lowPink, midPink, highPink, gain, isActive })
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
      <PinkNoise params={lowPink} setParams={setLowPink} />
      <PinkNoise params={midPink} setParams={setMidPink} />
      <PinkNoise params={highPink} setParams={setHighPink} />
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
