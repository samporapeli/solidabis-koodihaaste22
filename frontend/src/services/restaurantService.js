import axios from 'axios'

const api = 'http://localhost:8080/api/v1/restaurants'

const getRestaurants = async (city) => {
  return await axios.get(`${api}/${city}`)
}

export default {
  getRestaurants,
}
