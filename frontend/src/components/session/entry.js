import { formatTime } from '../utility'

const Entry = ({ categoryId, entry, index, removeEntry }) => {
  const [start, stop] = entry

  return (
    <li>
      {formatTime(stop - start)}
      <button
        value={index}
        id={categoryId}
        onClick={({ target }) => {
          removeEntry(target.id, target.value, stop - start)
        }}>
        remove
      </button>
    </li>
  )
}

export default Entry
