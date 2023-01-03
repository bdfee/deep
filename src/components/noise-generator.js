const noiseGenerator = (function () {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  const createNoise = (noise) => {
    const bufferSize = 2 * audioContext.sampleRate
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const output = noiseBuffer.getChannelData(0) // float32 of 88200

    if (noise.type === 'white-noise') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }
    }

    if (noise.type === 'pink-noise') {
      let b0 = 0
      let b1 = 0
      let b2 = 0
      let b3 = 0
      let b4 = 0
      let b5 = 0
      let b6 = 0

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.969 * b2 + white * 0.153852
        b3 = 0.8665 * b3 + white * 0.3104856
        b4 = 0.55 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.016898
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
        output[i] *= 0.11
        b6 = white * 0.115926
      }
    }

    if (noise.type === 'pink-economy') {
      let b0 = 0
      let b1 = 0
      let b2 = 0

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99765 * b0 + white * 0.099046
        b1 = 0.963 * b1 + white * 0.2965164
        b2 = 0.57 * b2 + white * 1.0526913
        output[i] = b0 + b1 + b2 + white * 0.1848
        output[i] *= 0.11
      }
    }

    noise.audioSource.buffer = noiseBuffer
  }

  const stopNoise = (noise) => {
    if (noise.audioSource) {
      noise.audioSource.stop()
      console.log('stopped?')
    }
  }

  const buildTrack = (noise) => {
    noise.audioSource = audioContext.createBufferSource()
    noise.gainNode = audioContext.createGain()
    noise.audioSource.connect(noise.gainNode)
    noise.gainNode.connect(audioContext.destination)
  }

  const setGain = (noise) => {
    noise.gainNode.gain.setValueAtTime(noise.volume, audioContext.currentTime)
  }

  const playNoise = (noise) => {
    stopNoise(noise)
    buildTrack(noise)
    createNoise(noise)
    setGain(noise)
    noise.audioSource.loop = true
    noise.audioSource.start()
  }

  return {
    play: playNoise,
    stop: stopNoise
  }
})()

export default noiseGenerator
