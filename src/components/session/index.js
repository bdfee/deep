import { useState, useEffect } from 'react'
import Categories from './categories'
import Items from './items'
import Timer from './timer/index'
import logService from '../../services/log'

const tempCategories = [
  {
    name: 'deep',
    id: '1'
  }
]

const tempId = () => (Math.random() * 100).toFixed(0).toString()

const Session = ({ isRunning, setIsRunning }) => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    setCategories(categories.concat(tempCategories))
  }, [])

  const logSession = () => {
    const session = {
      id: tempId(),
      date: new Date(),
      items: items
    }
    logService.createSession(session).then((res) => console.log(res))
  }

  const createEntry = (entryStartTime) => {
    const newEntry = [entryStartTime, new Date()]
    const entryTime = newEntry[1] - newEntry[0]
    const [isExistingItem] = items.filter(({ category }) => category.id === selectedCategory.id)

    if (isExistingItem) {
      isExistingItem.entries.push(newEntry)
      isExistingItem.totalTime += entryTime

      setItems(
        items.map((item) => {
          if (item.category.id === selectedCategory.id) return isExistingItem
          else return item
        })
      )
    } else {
      const newItem = {
        category: { name: 'deep', id: '1' },
        entries: [newEntry],
        totalTime: entryTime
      }
      setItems(items.concat(newItem))
    }
  }

  return (
    <div>
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
      />
      <h3>entries</h3>
      <Items items={items} setItems={setItems} />
    </div>
  )
}

export default Session
