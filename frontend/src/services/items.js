import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/items'

// get active session
const getAll = () => {
  return axios.get(baseUrl)
}

// remove item from active session
const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// create an item in an active session
const createItem = (newItem) => {
  return axios.post(baseUrl, newItem)
}

// add or remove an entry from an item
const updateItem = (id, itemEntries) => {
  return axios.put(`${baseUrl}/${id}`, itemEntries)
}

export default {
  getAll,
  deleteItem,
  createItem,
  updateItem
}
