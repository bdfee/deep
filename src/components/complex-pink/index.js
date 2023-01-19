import PinkNoise from './pink-noise'
import { useRef } from 'react'

const generateId = () => `pink_${Math.random()}`

const ComplexPink = () => {
  const track = useRef({})

  const initialParams = [
    { gain: 0.3, highPassFrequency: 9000, lowPassFrequency: 12000, id: generateId() },
    { gain: 0.1, highPassFrequency: 600, lowPassFrequency: 900, id: generateId() },
    { gain: 0.5, highPassFrequency: 20, lowPassFrequency: 60, id: generateId() }
  ]

  return (
    <div>
      {initialParams.map((param) => {
        track.current[param.id] = {}
        console.log(track)
        return (
          <PinkNoise key={param.id} id={param.id} params={param} track={track.current[param.id]} />
        )
      })}
    </div>
  )
}

export default ComplexPink
