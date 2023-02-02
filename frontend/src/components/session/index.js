import { useState, useEffect } from 'react'
import Categories from './categories'
import Items from './items'
import Timer from './timer/index'
import logService from '../../services/log'
import categoryService from '../../services/categories'

const tempId = () => (Math.random() * 100).toFixed(0).toString()

const Session = ({ isRunning, setIsRunning, log, setLog }) => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    categoryService.getAll().then((res) => {
      setCategories(categories.concat(res.data))
    })
  }, [])

  const logSession = () => {
    const session = {
      id: tempId(),
      date: new Date(),
      items: items
    }

    logService.createSession(session).then((res) => {
      setLog(log.concat(res.data))
      setItems([])
    })

    const updateCategories = categories.map((category) => {
      if (!category.submitted) {
        category.submitted = true
        categoryService.updateSubmitted(category.id, category)
      }
      return category
    })
    setCategories(updateCategories)
    setSelectedCategory('')
  }

  const createEntry = (entryStartTime) => {
    const newEntry = [entryStartTime, new Date()]
    const entryTime = newEntry[1] - newEntry[0]
    const [isExistingSessionItem] = items.filter(
      ({ category }) => category.id === selectedCategory.id
    )

    if (isExistingSessionItem) {
      isExistingSessionItem.entries.push(newEntry)
      isExistingSessionItem.totalTime += entryTime

      setItems(
        items.map((item) => {
          if (item.category.id === selectedCategory.id) return isExistingSessionItem
          else return item
        })
      )
    } else {
      const newItem = {
        category: { name: selectedCategory.name, id: selectedCategory.id },
        entries: [newEntry],
        totalTime: entryTime
      }
      setItems(items.concat(newItem))
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
      />
      <h3>entries</h3>
      <Items items={items} setItems={setItems} />
    </div>
  )
}

export default Session
