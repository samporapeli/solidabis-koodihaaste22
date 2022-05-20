import { useEffect, useState } from 'react'
import restaurantService from '../services/restaurantService'
import capitalizeCity from '../helpers/capitalizeCity'
import Restaurant from './Restaurant'

const RestaurantList = ({ city, ownVotes, updateOwnVotes }) => {
  const [ restaurantList, setRestaurantList ] = useState(null)

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setRestaurantList(null)
        const restaurants = await restaurantService.getRestaurants(city)
        setRestaurantList(restaurants)
      } catch (e) {
        setRestaurantList('error')
      }
    }
    getRestaurants()
  }, [ city, ownVotes ])

  if (!restaurantList) {
    return (
      'Loading...'
    )
  }
  // for some reason api sometimes returns HTTP 200 even when city is not found?
  else if (restaurantList === 'error' && city) {
    return (
      `Error loading data for ${city}`
    )
  } else if (city && restaurantList && restaurantList.data.restaurants.length === 0) {
    return (
      `No restaurants for ${city}`
    )
  } else if (!city) {
    return (
      'Waiting for input...'
    )
  } else return (
    <>
      <h2>Restaurants in {capitalizeCity(city)}</h2>
      <ul>
        {
          restaurantList.data.restaurants.map(r =>
            <Restaurant key={r.name} restaurant={r} ownVotes={ownVotes} updateOwnVotes={updateOwnVotes} />
          )
        }
      </ul>
    </>
  )
}

export default RestaurantList
