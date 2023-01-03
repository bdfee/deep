import { useState, useEffect } from 'react'
import NoiseControl from './components/noise-control'

function App() {
  const [noises, setNoises] = useState([])
  useEffect(() => {
    setNoises(noiseBank)
  }, [])

  const noiseBank = [
    {
      type: 'pink-noise',
      volume: 0.7
    },
    {
      type: 'pink-economy',
      volume: 0.8
    },
    {
      type: 'white-noise',
      volume: 0.3
    }
  ]

  return (
    <div className="App">
      <NoiseControl noises={noises} />
    </div>
  )
}

export default App
