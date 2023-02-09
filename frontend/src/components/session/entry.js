import { formatTime } from '../utility'

const Entry = ({ id, entry, index, removeEntry }) => {
  const [start, stop] = entry
  return (
    <li>
      {formatTime(stop - start)}
      <button
        className="entry-btn"
        value={index}
        id={id}
        onClick={({ target }) => {
          removeEntry(target.id, target.value, stop - start)
        }}>
        remove
      </button>
    </li>
  )
}

export default Entry
