import { formatTime } from './log.helpers'

const Items = ({ log, setLog }) => {
  // console.log('item, log', log)
  const removeCategory = (categoryId) => setLog(log.filter(({ id }) => id !== categoryId))

  const removeEntry = (categoryId, entryIndex) => {
    const [item] = log.filter(({ id }) => id === categoryId)
    if (item.entries.length <= 1) {
      removeCategory(categoryId)
    } else {
      setLog(
        log.map((item) => {
          if (item.id === categoryId) {
            item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          }
          return item
        })
      )
    }
  }

  return log.map(({ id, name, entries }) => {
    // console.log('item, entries', entries)
    return (
      <ul key={id} id={id}>
        {name}
        <button
          onClick={({ target }) => {
            removeCategory(target.parentElement.id)
          }}>
          remove
        </button>

        {entries.map(([start, stop], index) => (
          <li key={id + index} id={start}>
            {formatTime(stop - start)}
            <button
              value={index}
              id={id}
              onClick={({ target }) => {
                removeEntry(target.id, target.value)
              }}>
              remove
            </button>
          </li>
        ))}
      </ul>
    )
  })
}

export default Items
