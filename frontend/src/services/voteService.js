import axios from 'axios'
import config from './config'

const api = config.api

const getResults = async () => {
  return await axios.get(`${api}/results`)
}

const voteRestaurant = async (restaurantID) => {
  return await axios.post(`${api}/vote/${restaurantID}`)
}

export default {
  getResults,
  voteRestaurant,
}
