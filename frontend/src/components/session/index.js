import { useState, useEffect } from 'react'
import Categories from './categories'
import Items from './items'
import Timer from './timer/index'
import logService from '../../services/log'
import categoryService from '../../services/categories'
import itemService from '../../services/items'
import { createDateObjs, tempId } from '../utility'

const Session = ({
  isRunning,
  setIsRunning,
  log,
  setLog,
  selectedCategory,
  setSelectedCategory
}) => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    categoryService.getAll().then((res) => {
      setCategories(res.data)
    })
    itemService.getAll().then((res) => {
      const response = res.data.map((item) => {
        item.entries = item.entries.map((entry) => createDateObjs(entry))
        return item
      })
      setItems(response)
    })
  }, [])

  const logSession = () => {
    const session = {
      id: tempId(),
      date: new Date(),
      items: items
    }

    logService.create(session).then((res) => {
      setLog(log.concat(res.data))
    })

    items.map((item) => {
      const [category] = categories.filter((category) => category.id === item.id)
      category.totalTime += item.totalTime
      categoryService.update(category.id, category).then((res) => {
        setCategories(
          categories.map((category) => (category.id === res.data.id ? res.data : category))
        )
      })

      // bulk delete route in express

      itemService.deleteItem(item.id).then(() => {
        console.log('delete')
      })
      setSelectedCategory('')
    })

    setItems([])
  }

  const createEntry = (entryStartTime) => {
    const newEntry = [entryStartTime, new Date()]
    const entryTime = newEntry[1] - newEntry[0]
    const [existingItem] = items.filter(({ id }) => id === selectedCategory.id)
    if (existingItem) {
      existingItem.entries.push(newEntry)
      existingItem.totalTime += entryTime
      itemService.updateItem(existingItem.id, existingItem).then((res) => {
        res.data.entries = res.data.entries.map((entry) => createDateObjs(entry))
        setItems(
          items.map((item) => {
            if (item.id === res.data.id) return res.data
            else return item
          })
        )
      })
    } else {
      const newItem = {
        id: selectedCategory.id,
        name: selectedCategory.name,
        entries: [newEntry],
        totalTime: entryTime
      }
      itemService.createItem(newItem).then((res) => {
        res.data.entries = res.data.entries.map((entry) => createDateObjs(entry))
        setItems(items.concat(res.data))
      })
    }
  }

  const tempStyle = { background: '#FAFAFA' }
  return (
    <div style={tempStyle}>
      <h2>Session</h2>
      <button onClick={logSession}>log session</button>
      <h3>timer</h3>
      <Timer createEntry={createEntry} isRunning={isRunning} setIsRunning={setIsRunning} />
      <h3>categories</h3>
      <Categories
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        items={items}
        setItems={setItems}
      />
      <h3>items</h3>
      <Items items={items} setItems={setItems} />
    </div>
  )
}

export default Session
