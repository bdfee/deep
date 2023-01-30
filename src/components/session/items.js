import { formatTime } from './log.helpers'
import sessionService from '../../services/session'

const Items = ({ session, setSession }) => {
  const removeCategory = (categoryId) => setSession(session.filter(({ id }) => id !== categoryId))

  const removeEntry = (categoryId, entryIndex) => {
    const [item] = session.filter(({ id }) => id === categoryId)
    if (item.entries.length <= 1) {
      sessionService.removeItem(categoryId).then((res) => {
        console.log(res)
        removeCategory(categoryId)
      })
    } else {
      const updateEntries = session.map((item) => {
        if (item.id === categoryId) {
          item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          sessionService.updateEntries(categoryId, item).then((res) => console.log(res))
        }
        return item
      })
      setSession(updateEntries)
    }
  }

  return session.map(({ id, name, entries }) => {
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
