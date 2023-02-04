import Item from './item'
import itemService from '../../services/items'
import { createDateObjs } from '../utility'

const Items = ({ items, setItems }) => {
  const removeItem = (categoryId) => {
    console.log(categoryId)
    itemService.deleteItem(categoryId).then((res) => {
      if (res.status === 200) {
        setItems(items.filter(({ id }) => id !== Number(categoryId)))
      }
    })
  }

  const removeEntry = (categoryId, entryIndex, entryTime) => {
    const [item] = items.filter(({ id }) => id === Number(categoryId))
    console.log('remove item', item)
    if (item.entries.length <= 1) {
      removeItem(categoryId)
    } else {
      const updatedItems = items.map((item) => {
        if (item.id === Number(categoryId)) {
          item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          item.totalTime -= entryTime
          itemService.updateItem(item.id, item).then((res) => {
            console.log(res)
            res.data.entries = res.data.entries.map((entry) => createDateObjs(entry))
          })
        }
        return item
      })
      setItems(updatedItems)
    }
  }
  return items.map(({ id, name, entries, totalTime }) => (
    <Item
      key={id}
      id={id}
      name={name}
      entries={entries}
      totalTime={totalTime}
      removeItem={removeItem}
      removeEntry={removeEntry}
    />
  ))
}

export default Items
