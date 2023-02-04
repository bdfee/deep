import axios from 'axios'
const baseUrl = 'http://localhost:3001/categories'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newCategory) => {
  return axios.post(baseUrl, newCategory)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedCategory) => {
  return axios.put(`${baseUrl}/${id}`, updatedCategory)
}

export default {
  getAll,
  create,
  update,
  remove
}
