import { formatTime } from './log.helpers'

const Items = ({ log, setLog }) => {
  const removeCategory = (categoryId) =>
    setLog(log.filter(({ category }) => category.id !== categoryId))

  const removeEntry = (categoryId, entryIndex) => {
    const [item] = log.filter(({ category }) => category.id === categoryId)
    if (item.entries.length <= 1) {
      removeCategory(categoryId)
    } else {
      setLog(
        log.map((item) => {
          if (item.category.id === categoryId) {
            item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          }
          return item
        })
      )
    }
  }

  return log.map(({ category, entries }) => {
    return (
      <ul key={category.id} id={category.id}>
        {category.name}
        <button
          onClick={({ target }) => {
            removeCategory(target.parentElement.id)
          }}>
          remove
        </button>

        {entries.map(([start, stop], index) => (
          <li key={category.id + index} id={start}>
            {formatTime(stop - start)}
            <button
              value={index}
              id={category.id}
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
