import axios from 'axios'
const baseUrl = 'http://localhost:3001/log'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (session) => {
  return axios.post(baseUrl, session)
}

export default {
  getAll,
  create
}
