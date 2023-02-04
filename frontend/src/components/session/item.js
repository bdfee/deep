import Entry from './entry'
import { formatTime } from '../utility'
const Item = ({ id, name, entries, totalTime, removeItem, removeEntry }) => {
  return (
    <ul key={id} id={id}>
      <h4>
        {name} {formatTime(totalTime)}
        <button
          onClick={() => {
            removeItem(id)
          }}>
          remove
        </button>
      </h4>
      entries
      {entries.map((entry, index) => (
        <Entry
          key={id + '_' + index}
          id={id}
          entry={entry}
          index={index}
          removeEntry={removeEntry}
        />
      ))}
    </ul>
  )
}

export default Item
