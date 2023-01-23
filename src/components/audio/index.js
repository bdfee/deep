import { useAudioContext } from './utility/useAudioContext'
import AudioParameters from './audio-parameters'

const Audio = () => {
  // everything that doesn't need to be rebuilt on sound start
  const audioContext = useAudioContext()
  const gainNode = audioContext.createGain()
  const audio = {
    context: audioContext,
    graph: {
      out: gainNode,
      tracks: {}
    }
  }

  return <AudioParameters audio={audio} />
}

export default Audio
