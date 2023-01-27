import { useState, useEffect } from 'react'
import Categories from './categories'
import Items from './items'
import Timer from './timer/index'
import { formatTime } from './log.helpers'

const tempCategoryList = ['deep', 'full stack open', 'space fight']

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
    const isExistingCategory = log.filter((entry) => entry.category === selectedCategory)

    if (isExistingCategory.length) {
      setLog(
        log.map((item) => {
          if (item.category === selectedCategory) item.entries.push(newEntry)
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
      <Timer
        log={log}
        setLog={setLog}
        selectedCategory={selectedCategory}
        createEntry={createEntry}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
      <h3>categories</h3>
      <Categories
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <h3>entries</h3>
      <Items log={log} formatTime={formatTime} />
      <div>
        <button onClick={() => setLog([])}>clear log</button>
      </div>
    </div>
  )
}

export default Log
