import noiseGenerator from './noise-generator'

const NoiseControl = (props) => {
  return props.noises.map((noise) => {
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
      </div>
    )
  })
}

export default NoiseControl