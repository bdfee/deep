import { useState } from 'react'
import Session from './session/index'
import AudioParameters from './audio/audio-parameters'
import Log from './log/index'

// container toggles between form and playing status

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)
  return (
    <div>
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'stop' : 'start'}</button>
      <AudioParameters isRunning={isRunning} />
      <Session isRunning={isRunning} setIsRunning={setIsRunning} />
      <Log />
    </div>
  )
}

export default Container
