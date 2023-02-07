import Item from './item'
import itemService from '../../services/items'
import { createDateObjs } from '../utility'

const Session = ({ items, setItems, logSession, showSession }) => {
  const removeItem = (categoryId) => {
    itemService.deleteItem(categoryId).then((res) => {
      if (res.status === 204) {
        setItems(items.filter(({ id }) => id !== Number(categoryId)))
      }
    })
  }

  const removeEntry = (categoryId, entryIndex, entryTime) => {
    const [item] = items.filter(({ id }) => id === Number(categoryId))
    if (item.entries.length <= 1) {
      removeItem(categoryId)
    } else {
      const updatedItems = items.map((item) => {
        if (item.id === Number(categoryId)) {
          item.entries = item.entries.filter((_, index) => index !== Number(entryIndex))
          item.totalTime -= entryTime
          itemService.updateItem(item.id, item).then((res) => {
            res.data.entries = res.data.entries.map((entry) => createDateObjs(entry))
          })
        }
        return item
      })
      setItems(updatedItems)
    }
  }

  const display = { display: showSession ? 'block' : 'none' }

  return (
    <div style={display}>
      <h2>session</h2>
      {items.length ? <button onClick={logSession}>log session</button> : ''}
      {items.map(({ id, name, entries, totalTime }) => (
        <Item
          key={id}
          id={id}
          name={name}
          entries={entries}
          totalTime={totalTime}
          removeItem={removeItem}
          removeEntry={removeEntry}
        />
      ))}
    </div>
  )
}

export default Session
