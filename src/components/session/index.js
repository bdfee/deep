import { useState, useEffect } from 'react'
import Categories from './categories'
import Items from './items'
import Timer from './timer/index'
import categoriesService from '../../services/categories'
import sessionService from '../../services/session'

const Session = ({ isRunning, setIsRunning }) => {
  const [session, setSession] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    categoriesService.getAll().then((res) => {
      setCategories(categories.concat(res.data))
    })

    sessionService.getAllItems().then((res) => {
      if (res.data.length > 0) {
        setSession(
          session.concat(
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
      }
    })
  }, [])

  const createEntry = (entryStartTime) => {
    const newEntry = [entryStartTime, new Date()]
    const isExistingLogCategory = session.filter((item) => item.id === selectedCategory.id)

    if (isExistingLogCategory.length) {
      const updatedItem = session.find((item) => item.id === selectedCategory.id)
      updatedItem.entries.push(newEntry)

      sessionService.updateEntries(selectedCategory.id, updatedItem).then(({ status }) => {
        if (status === 200) {
          setSession(
            session.map((item) => {
              if (item.id === selectedCategory.id) return updatedItem
              else return item
            })
          )
        }
      })
    } else {
      const newLogItem = {
        name: selectedCategory.name,
        id: selectedCategory.id,
        entries: [newEntry]
      }
      sessionService.createEntry(newLogItem).then(({ status }) => {
        if (status === 201) setSession(session.concat(newLogItem))
      })
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
      <Items session={session} setSession={setSession} />
    </div>
  )
}

export default Session
