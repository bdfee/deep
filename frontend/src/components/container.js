import { useState, useEffect } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import Setup from './setup'
import Audio from './audio/index'
import Log from './log/index'

import Session from './session/index'

import logService from '../services/log'
import categoryService from '../services/categories'
import itemService from '../services/items'
import { createDateObjs, tempId } from './utility'

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [log, setLog] = useState([])
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [showSession, setShowSession] = useState(false)
  const [showLog, setShowLog] = useState(false)

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
      <BrowserView></BrowserView>
      <MobileView>
        this is mobile
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
        <Audio isRunning={isRunning} />
        <Session
          items={items}
          setItems={setItems}
          showSession={showSession}
          logSession={logSession}
        />
        <Log log={log} showLog={showLog} />
        {selectedCategory ? (
          <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'stop' : 'start'}</button>
        ) : (
          ''
        )}
        <div>
          <button onClick={() => setShowSession(!showSession)}>session</button>
          <button onClick={() => setShowLog(!showLog)}>log</button>
          <button>categories</button>
        </div>
      </MobileView>
    </>
  )
}

export default Container
