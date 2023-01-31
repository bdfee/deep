export const formatTime = (ms) => {
  return new Date(ms).toISOString().slice(11, 19)
}

export const totalTimeMs = (entries) => {
  return entries.map(([start, end]) => end - start)
}
