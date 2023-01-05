import { useState, useEffect } from 'react'
import NoiseControl from './components/noise-control'
import Clock from './components/clock'

function App() {
  const [noises, setNoises] = useState([])
  useEffect(() => {
    setNoises(noiseBank)
  }, [])

  const noiseBank = [
    {
      type: 'pink-noise',
      volume: 0.7
    }
  ]

  return (
    <div className="App">
      <Clock />
      <NoiseControl noises={noises} />
    </div>
  )
}

export default App
