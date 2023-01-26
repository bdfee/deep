import { formatTime } from '../utility'

const Items = ({ log }) => {
  return log.map(({ category, entries }) => {
    return (
      <ul key={category}>
        {category}
        {entries.map(([start, stop]) => (
          <li key={start}>{formatTime(stop - start)}</li>
        ))}
      </ul>
    )
  })
}

export default Items
