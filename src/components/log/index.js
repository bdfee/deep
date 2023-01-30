import { useState, useEffect } from 'react'
import Categories from './categories'
import Items from './items'
import Timer from './timer/index'
import axios from 'axios'

const Log = ({ isRunning, setIsRunning }) => {
  const [log, setLog] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/categories').then((res) => {
      // extract category name and id
      setCategories(
        categories.concat(
          res.data.map((category) => {
            return { name: category.name, id: category.id }
          })
        )
      )
      // create date objects out of timestrings stored in db
      setLog(
        log.concat(
          res.data.map((category) => {
            category.entries.map((entry) => {
              entry[0] = new Date(entry[0])
              entry[1] = new Date(entry[1])
              return entry
            })
            return category
          })
        )
      )
    })
  }, [])

  const createEntry = (entryStartTime) => {
    const newEntry = [entryStartTime, new Date()]
    const isExistingLogCategory = log.filter((item) => item.id === selectedCategory.id)
    if (isExistingLogCategory.length) {
      setLog(
        log.map((item) => {
          if (item.id === selectedCategory.id) item.entries.push(newEntry)
          return item
        })
      )
    } else {
      const newLogItem = {
        name: selectedCategory.name,
        id: selectedCategory.id,
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
