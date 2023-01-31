import { formatTime } from './log.helpers'
import sessionService from '../../services/session'

const Items = ({ items, setItems }) => {
  const removeItem = (categoryId) => {
    sessionService.removeItem(categoryId).then((res) => {
      if (res.status === 200) {
        setItems(items.filter(({ id }) => id !== categoryId))
      }
    })
  }

  const removeEntry = (categoryId, entryIndex) => {
    const [item] = items.filter(({ id }) => id === categoryId)
    if (item.entries.length <= 1) {
      removeItem(categoryId)
    } else {
      const updatedItems = items.map((item) => {
        if (item.id === categoryId) {
          item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          sessionService.updateEntries(categoryId, item).then((res) => console.log(res))
        }
        return item
      })
      setItems(updatedItems)
    }
  }

  return items.map(({ id, name, entries }) => {
    return (
      <ul key={id} id={id}>
        {name}
        <button
          onClick={({ target }) => {
            removeItem(target.parentElement.id)
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
