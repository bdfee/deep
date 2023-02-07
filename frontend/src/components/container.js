import { useState, useEffect } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import Setup from './setup'
import Audio from './audio/index'
import Log from './log/index'
import Categories from './categories'
import Session from './session/index'
import DisplayToggle from './display-toggle'
import ActiveToggle from './active-toggle'
import logService from '../services/log'
import categoryService from '../services/categories'
import itemService from '../services/items'
import { createDateObjs, tempId } from './utility'
import '../container.css'

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [log, setLog] = useState([])
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [showSection, setShowSection] = useState('')

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

  useEffect(() => {
    logService.getAll().then((res) => {
      const response = res.data.map((session) => {
        session.items.map((item) => {
          item.entries = item.entries.map((entry) => createDateObjs(entry))
        })
        return session
      })
      setLog(response)
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

    const ids = []

    items.map((item) => {
      // push the id onto the array to be posted to bulk clear
      ids.push(item.id)

      const [category] = categories.filter((category) => category.id === item.id)
      category.totalTime += item.totalTime
      categoryService.update(category.id, category).then((res) => {
        setCategories(
          categories.map((category) => (category.id === res.data.id ? res.data : category))
        )
      })
      setSelectedCategory('')
    })

    itemService.clearItems(ids).then((res) => {
      setItems(res.data)
    })
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

  return (
    <>
      <BrowserView>this is browser</BrowserView>
      <MobileView className="mobile-grid">
        <div className="category-display row">
          {!showSection.length ? (
            <Setup
              categories={categories}
              setCategories={setCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              items={items}
              setItems={setItems}
              createEntry={createEntry}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          ) : (
            ''
          )}
          <Audio isRunning={isRunning} showSection={showSection} />
          <Session
            items={items}
            setItems={setItems}
            showSection={showSection}
            logSession={logSession}
          />
          <Log log={log} showSection={showSection} />
          <Categories
            showSection={showSection}
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            items={items}
            setItems={setItems}
          />
        </div>
        <div className="row">
          <ActiveToggle
            selectedCategory={selectedCategory}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            setShowSection={setShowSection}
          />
        </div>
        <div className="row">
          <DisplayToggle setShowSection={setShowSection} showSection={showSection} />
        </div>
      </MobileView>
    </>
  )
}

export default Container
