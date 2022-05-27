import { useEffect, useState } from 'react'
import restaurantService from '../services/restaurantService'
import capitalizeCity from '../helpers/capitalizeCity'
import Restaurant from './Restaurant'
import Window from '../ui/Window'

const RestaurantList = ({
    city,
    results,
    restaurants,
    setRestaurants,
    search,
  }) => {
  const [ updated, setUpdated ] = useState(+(new Date()))

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
  }, [ city, updated ])

  const updateList = () => {
    setUpdated(+(new Date()))
  }

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
    <Window
      id={`restaurant-list-${capitalizeCity(city)}`}
      title={`Restaurants in ${capitalizeCity(city)}`}
    >
      <ul className='tree-view restaurant-tree'>
        {
          restaurants[city.toLowerCase()].data.restaurants
            .filter(r =>
              r.name.toLowerCase().includes(search) ||
              r.dishes.some(d => d.name.toLowerCase().includes(search))
            )
            .map(r => {
              const ownVotes = restaurants[city.toLowerCase()].data.alreadyVoted
              return (<Restaurant
                key={r.id}
                restaurant={r}
                results={results}
                ownVotes={ownVotes}
                updateList={updateList}
              />)
          })
        }
      </ul>
    </Window>
  )
}

export default RestaurantList
