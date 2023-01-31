import axios from 'axios'
const baseUrl = 'http://localhost:3001/categories'

// get all user categories from db

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newCategory) => {
  return axios.post(baseUrl, newCategory)
}

export default {
  getAll,
  create
}
