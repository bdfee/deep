import { useState, useEffect } from 'react'
import Categories from './categories'
import Items from './items'
import Timer from './timer/index'

const tempId = () => (Math.random() * 100).toFixed(2).toString()

const tempCategoryList = [
  { name: 'deep', id: tempId() },
  { name: 'full stack open', id: tempId() },
  { name: 'space fight', id: tempId() }
]

const Log = ({ isRunning, setIsRunning }) => {
  const [log, setLog] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    setCategories(tempCategoryList)
    setSelectedCategory(tempCategoryList[0])
  }, [])

  const createEntry = (entryStartTime) => {
    const newEntry = [entryStartTime, new Date()]
    const isExistingLogCategory = log.filter((item) => item.category.id === selectedCategory.id)
    const [start, end] = newEntry

    console.log('start', typeof start)
    console.log('end', typeof end)
    if (isExistingLogCategory.length) {
      setLog(
        log.map((item) => {
          if (item.category.id === selectedCategory.id) item.entries.push(newEntry)
          return item
        })
      )
    } else {
      const newLogItem = {
        category: selectedCategory,
        entries: [newEntry]
      }
      setLog(log.concat(newLogItem))
    }
  }

  return (
    <div>
      <h2>Log</h2>
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
      <Items log={log} setLog={setLog} />
    </div>
  )
}

export default Log
