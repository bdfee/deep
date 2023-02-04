export const formatTime = (ms) => {
  return new Date(ms).toISOString().slice(11, 19)
}

export const createDateObjs = (entry) => {
  return [new Date(entry[0]), new Date(entry[1])]
}

export const tempId = () => Number((Math.random() * 100).toFixed(0))
