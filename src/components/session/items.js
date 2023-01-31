import Entry from './entry'

const Items = ({ items, setItems }) => {
  const removeItem = (categoryId) => {
    setItems(items.filter(({ id }) => id !== categoryId))
  }

  const removeEntry = (categoryId, entryIndex, entryTime) => {
    const [item] = items.filter(({ id }) => id === categoryId)
    if (item.entries.length <= 1) {
      removeItem(categoryId)
    } else {
      const updatedItems = items.map((item) => {
        if (item.id === categoryId) {
          item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          item.totalTime -= entryTime
        }
        return item
      })
      setItems(updatedItems)
    }
  }

  return items.map(({ id, name, entries, totalTime }) => {
    return (
      <ul key={id} id={id}>
        {name} {totalTime}
        <button
          onClick={({ target }) => {
            removeItem(target.parentElement.id)
          }}>
          remove
        </button>
        {entries.map((entry, index) => (
          <Entry
            key={id + index}
            categoryId={id}
            entry={entry}
            index={index}
            removeEntry={removeEntry}
          />
        ))}
      </ul>
    )
  })
}

export default Items
