import axios from 'axios'
const baseUrl = 'http://localhost:3001/categories'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newCategory) => {
  return axios.post(baseUrl, newCategory)
}

const remove = (id) => {
  const categoryUrl = `${baseUrl}/${id}`
  return axios.delete(categoryUrl)
}

export default {
  getAll,
  create,
  remove
}
