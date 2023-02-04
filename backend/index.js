/* eslint-disable no-undef */
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// middleware

const requestLogger = (request, response, next) => {
  console.log('method: ', request.method)
  console.log('path: ', request.path)
  console.log('body: ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// routes
// categories
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/categories', (request, response) => {
  response.json(categories)
})

app.delete('/api/categories/:id', (request, response) => {
  const id = request.params.id
  categories = categories.filter((category) => category.id !== id)
  response.status(204).end()
})

app.post('/api/categories', (request, response) => {
  const category = request.body
  categories = categories.concat(category)
  response.json(request.body)
})

app.put('/api/categories/:id', (request, response) => {
  const id = request.params.id
  categories = categories.map((category) => {
    if (category.id === id) {
      category.submitted = true
    }
    return category
  })
  response.json(request.body)
})

// items

app.get('/api/session', (request, response) => {
  response.json(session)
})

app.delete('/api/session/:id', (request, response) => {
  const categoryId = request.params.id
  session = session.filter((item) => item.category.id !== categoryId)
  response.status(204).end()
})

app.post('/api/session', (request, response) => {
  const newItem = request.body
  session = session.concat(newItem)
  response.json(request.body)
})

app.put('/api/session/:id', (request, response) => {
  const id = request.params.id
  const updatedItem = request.body
  session = session.map((item) => {
    if (item.category.id === id) {
      item.entries = updatedItem.entries
    }
    return item
  })
  response.json(request.body)
})

app.post('/api/clear_session', (request, response) => {
  console.log(request, response)
})
// log

app.get('/api/log', (request, response) => {
  response.json(log)
})

app.post('/api/log', (request, response) => {
  const newSession = request.body
  log = log.concat(newSession)
  response.json(request.body)
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
