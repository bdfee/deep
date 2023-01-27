import Log from './log/index'
import AudioParameters from './audio/audio-parameters'

// start needs to hit audioparams file, count down where handler is augmented, and toggle

const Container = () => {
  return (
    <div>
      <AudioParameters />
      <Log />
    </div>
  )
}

export default Container
