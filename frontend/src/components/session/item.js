import Entry from './entry'
import { useState } from 'react'
import { formatTime } from '../utility'
const Item = ({ id, name, entries, totalTime, removeItem, removeEntry }) => {
  const [showEntries, setShowEntries] = useState(false)
  const style = { border: 'solid 1px black' }

  return (
    <div key={id} id={id} style={style} className="entry">
      <div className="entry-header">
        <div className="entry-name">
          <b>{name}</b>
        </div>
        <div>{formatTime(totalTime)}</div>
        <button
          className="entry-btn"
          onClick={() => {
            removeItem(id)
          }}>
          remove
        </button>
      </div>
      <div>
        <button onClick={() => setShowEntries(!showEntries)} className="entry-btn">
          entries
        </button>
        {showEntries ? (
          <ul>
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
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Item
