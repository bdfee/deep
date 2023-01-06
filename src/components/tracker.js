import { useState, useEffect } from 'react'
import NoiseControl from './noise-control'
import Timer from './timer'

const Tracker = () => {
  const [noises, setNoises] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setNoises(noiseBank)
    setCategories(categoriesObj)
  }, [])

  const noiseBank = [
    {
      type: 'pink-noise',
      volume: 0.03
    }
  ]
  // TODO JSONdb
  const categoriesObj = ['full stack open', 'd3', 'space fight']
  return (
    <div>
      <Timer categories={categories} />
      <NoiseControl noises={noises} />
    </div>
  )
}

export default Tracker
