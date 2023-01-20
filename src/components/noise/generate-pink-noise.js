import { useAudioContext } from '../../utility/useAudioContext'

export const generatePink = (audioTrack) => {
  const audioContext = useAudioContext()

  const createAudioNodes = (track) => {
    track.audioSource = audioContext.createBufferSource()
    track.gainNode = audioContext.createGain()
    track.lowpassFilter = audioContext.createBiquadFilter()
    track.highpassFilter = audioContext.createBiquadFilter()
  }

  const generateAudioBuffer = (track) => {
    const bufferSize = 5 * audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
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

  const setAudioNodeParams = (track) => {
    track.gainNode.gain.value = audioTrack.gain
    track.audioSource.loop = true
    track.lowpassFilter.type = 'lowpass'
    track.lowpassFilter.frequency.value = audioTrack.lowpassFreq
    track.highpassFilter.type = 'highpass'
    track.highpassFilter.frequency.value = audioTrack.highpassFreq
  }

  const connectAudioNodes = (track) => {
    track.audioSource.connect(track.gainNode)
    track.gainNode.connect(track.lowpassFilter)
    track.lowpassFilter.connect(track.highpassFilter)
  }

  createAudioNodes(audioTrack)
  generateAudioBuffer(audioTrack)
  setAudioNodeParams(audioTrack)
  connectAudioNodes(audioTrack)

  // clean up object
  delete audioTrack.gain
  delete audioTrack.lowpassFreq
  delete audioTrack.highpassFreq
}
