import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/categories'

// get all user categories from db

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newCategory) => {
  return axios.post(baseUrl, newCategory)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateSubmitted = (id, updatedCategory) => {
  return axios.put(`${baseUrl}/${id}`, updatedCategory)
}

export default {
  getAll,
  create,
  updateSubmitted,
  remove
}
