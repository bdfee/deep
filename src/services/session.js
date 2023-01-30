import axios from 'axios'
const baseUrl = 'http://localhost:3001/session'

const getAllItems = () => {
  return axios.get(baseUrl)
}

const createEntry = (newItem) => {
  return axios.post(baseUrl, newItem)
}

const updateEntries = (id, newEntries) => {
  return axios.put(`${baseUrl}/${id}`, newEntries)
}

const removeItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAllItems,
  createEntry,
  updateEntries,
  removeItem
}