import Item from './item'

const Items = ({ items, setItems }) => {
  const removeItem = (categoryId) => {
    setItems(items.filter(({ category }) => category.id !== categoryId))
  }

  const removeEntry = (categoryId, entryIndex, entryTime) => {
    const [item] = items.filter(({ category }) => category.id === categoryId)
    if (item.entries.length <= 1) {
      removeItem(categoryId)
    } else {
      const updatedItems = items.map((item) => {
        if (item.category.id === categoryId) {
          item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          item.totalTime -= entryTime
        }
        return item
      })
      setItems(updatedItems)
    }
  }

  return items.map(({ category, entries, totalTime }) => (
    <Item
      key={category.id}
      category={category}
      entries={entries}
      totalTime={totalTime}
      removeItem={removeItem}
      removeEntry={removeEntry}
    />
  ))
}

export default Items
