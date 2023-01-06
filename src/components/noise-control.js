import noiseGenerator from './noise-generator'

const NoiseControl = () => {
  const noises = [
    {
      type: 'pink-noise',
      volume: 0.03
    }
  ]

  return noises.map((noise) => {
    return (
      <div key={`${noise.type}_control`}>
        {noise.type}
        <button
          key={`${noise.type}_play`}
          onClick={() => {
            noiseGenerator.play(noise)
          }}>
          play
        </button>
        <button
          key={`${noise.type}_stop`}
          onClick={() => {
            noiseGenerator.stop(noise)
          }}>
          stop
        </button>
        <input
          type="range"
          id="volume"
          min="0"
          max=".05"
          step=".0025"
          onChange={({ target }) => noiseGenerator.volume(noise, target.value)}></input>
      </div>
    )
  })
}

export default NoiseControl
