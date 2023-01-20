import { useRef } from 'react'
import { useAudioContext } from '../../utility/useAudioContext'
import { generatePink } from './generate-pink-noise'
import PinkNoiseControl from './pink-noise-controls'
import MainOutControl from './main-out-controls'

const FullAudio = () => {
  const audioContext = useAudioContext()
  // const [mainGain, setMainGain] = useState(0.2)
  const audioData = useRef({})

  // add main out
  audioData.current.mainOut = {}
  audioData.current.mainOut.gainNode = audioContext.createGain()

  // initial audio params
  audioData.current.mainOut.gainNode.gain.value = 0.3
  audioData.current.audioTracks = [
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
  ]

  audioData.current.audioTracks.map((track) => generatePink(track))

  return (
    <div>
      {audioData.current.audioTracks.map((track) => (
        <PinkNoiseControl audioTrack={track} key={track.id} />
      ))}
      <MainOutControl audioData={audioData.current} />
      <div>
        <button
          onClick={() => {
            console.log(audioData.current)
          }}>
          log audio data
        </button>
        <button
          onClick={() => {
            console.log(audioContext)
          }}>
          log audio context
        </button>
      </div>
    </div>
  )
}

export default FullAudio
