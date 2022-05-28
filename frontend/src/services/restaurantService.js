import axios from 'axios'
import config from './config'

const api = config.api

const getRestaurants = async (city) => {
  return await axios.get(`${api}/restaurants/${city}`)
}

export default {
  getRestaurants,
}
