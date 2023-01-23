export const createAudioNodes = (track, audio) => {
  track.audioSource = audio.context.createBufferSource()
  track.gainNode = audio.context.createGain()
  track.lowpassFilter = audio.context.createBiquadFilter()
  track.highpassFilter = audio.context.createBiquadFilter()
}

export const createPinkNoiseAudioBuffer = (track, audio) => {
  const bufferSize = 5 * audio.context.sampleRate
  const buffer = audio.context.createBuffer(1, bufferSize, audio.context.sampleRate)
  const output = buffer.getChannelData(0)

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

  track.audioSource.buffer = buffer
}

export const setAudioNodeParams = (track, params) => {
  track.gainNode.gain.value = params.gain
  track.audioSource.loop = true
  track.lowpassFilter.type = 'lowpass'
  track.highpassFilter.type = 'highpass'
  track.lowpassFilter.frequency.value = params.lowpassFreq
  track.highpassFilter.frequency.value = params.highpassFreq
}

export const connectAudioNodes = (track, audio) => {
  track.audioSource.connect(track.gainNode)
  track.gainNode.connect(track.lowpassFilter)
  track.lowpassFilter.connect(track.highpassFilter)
  track.highpassFilter.connect(audio.graph.out)
  audio.graph.out.connect(audio.context.destination)
}
