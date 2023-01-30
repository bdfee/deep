import axios from 'axios'
const baseUrl = 'http://localhost:3001/items'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newItem) => {
  return axios.post(baseUrl, newItem)
}

const update = (id, newItem) => {
  return axios.put(`${baseUrl}/${id}`, newItem)
}

export default {
  getAll,
  create,
  update
}
