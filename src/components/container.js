import { useState } from 'react'
import Log from './log/index'
import AudioParameters from './audio/audio-parameters'

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)
  return (
    <div>
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'stop' : 'start'}</button>
      <AudioParameters isRunning={isRunning} />
      <Log isRunning={isRunning} />
    </div>
  )
}

export default Container
