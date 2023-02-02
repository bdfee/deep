import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/session'

// get active session
const getAllItems = () => {
  return axios.get(baseUrl)
}

// remove items from active session
const removeItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// create an item in an active session
const createEntry = (newItem) => {
  return axios.post(baseUrl, newItem)
}

// add or remove an entry from an item
const updateEntries = (id, newEntries) => {
  return axios.put(`${baseUrl}/${id}`, newEntries)
}

export default {
  getAllItems,
  removeItem,
  createEntry,
  updateEntries
}
