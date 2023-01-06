import { useState, useEffect } from 'react'
import NoiseControl from './noise-control'
import Timer from './timer'
import BankDisplay from './bank-display'

const Tracker = () => {
  // hold state in tracker for now
  const [noises, setNoises] = useState([])
  const [userBank, setUserBank] = useState([])

  const style = {
    border: '1px solid',
    paddingTop: '5px'
  }
  useEffect(() => {
    setNoises(noiseBank)
    setUserBank(userBanks)
  }, [])

  const noiseBank = [
    {
      type: 'pink-noise',
      volume: 0.03
    }
  ]
  // TODO JSONdb
  const userBanks = ['full stack open', 'd3', 'space fight']

  return (
    <div className="tracker" style={style}>
      tracker
      <Timer />
      <NoiseControl noises={noises} />
      <BankDisplay bank={userBank} setUserBank={setUserBank} />
    </div>
  )
}

export default Tracker
