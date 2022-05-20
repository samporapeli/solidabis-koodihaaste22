import { useEffect } from 'react'
import restaurantService from '../services/restaurantService'
import capitalizeCity from '../helpers/capitalizeCity'
import Restaurant from './Restaurant'

const RestaurantList = ({
    city,
    restaurants,
    setRestaurants,
    ownVotes,
    updateOwnVotes
  }) => {
  useEffect(() => {
    const getRestaurants = async () => {
      let newRestaurants = {...restaurants}
      try {
        // set "loading mode"
        setRestaurants((state) => {
          newRestaurants = {...state}
          newRestaurants[city.toLowerCase()] = null
          return newRestaurants
        })
        // make the response and finally set restaurants
        const response = await restaurantService.getRestaurants(city)
        // inspiration for giving a function to prevent race condition issues:
        // https://stackoverflow.com/questions/38065534/race-condition-in-react-setstate
        setRestaurants((state) => {
          newRestaurants = {...state}
          newRestaurants[city.toLowerCase()] = response
          return newRestaurants
        })
      } catch (e) {
        newRestaurants[city.toLowerCase()] = 'error'
        setRestaurants(newRestaurants)
      }
    }
    getRestaurants()
  }, [ city, ownVotes ])

  if (!restaurants[city.toLowerCase()]) {
    return (
      'Loading...'
    )
  }
  // for some reason api sometimes returns HTTP 200 even when city is not found?
  else if (!restaurants[city.toLowerCase()] === 'error' && city) {
    return (
      `Error loading data for ${city}`
    )
  } else if (city && restaurants[city.toLowerCase()] && restaurants[city.toLowerCase()].data.restaurants.length === 0) {
    return (
      `No restaurants for ${city}`
    )
  } else if (!city) {
    return (
      'Waiting for input...'
    )
  } else return (
    <>
      <h3>Restaurants in {capitalizeCity(city)}</h3>
      <ul>
        {
          restaurants[city.toLowerCase()].data.restaurants.map(r =>
            <Restaurant key={r.id} restaurant={r} ownVotes={ownVotes} updateOwnVotes={updateOwnVotes} />
          )
        }
      </ul>
    </>
  )
}

export default RestaurantList
