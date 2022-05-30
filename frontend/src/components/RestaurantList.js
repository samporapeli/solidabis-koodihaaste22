import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import restaurantService from '../services/restaurantService'
import capitalizeCity from '../helpers/capitalizeCity'
import Restaurant from './Restaurant'
import Window from '../ui/Window'

// this component is pretty long, but I find it difficult to split
const RestaurantList = ({
  city,
  cities,
  setCities,
  results,
  restaurants,
  setRestaurants,
  search,
  setOwnVote,
  updateResults,
}) => {
  const [ updated, setUpdated ] = useState(+(new Date()))

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        // set "loading mode"
        setRestaurants((state) => {
          const newRestaurants = { ...state }
          newRestaurants[lcCity] = null
          return newRestaurants
        })
        // make the response and finally set restaurants
        const response = await restaurantService.getRestaurants(city)
        // inspiration for giving a function to prevent race condition issues:
        // https://stackoverflow.com/questions/38065534/race-condition-in-react-setstate
        setRestaurants((state) => {
          const newRestaurants = { ...state }
          newRestaurants[lcCity] = response
          return newRestaurants
        })
      } catch (e) {
        setRestaurants((state) => {
          const newRestaurants = { ...state }
          newRestaurants[lcCity] = 'error'
          return newRestaurants
        })
      }
    }
    getRestaurants()
  }, [ city, updated ])

  const updateList = () => {
    setUpdated(+(new Date()))
  }

  const capitalizedCity = useMemo(() => {
    return capitalizeCity(city)
  }, [ city ])

  const lcCity = useMemo(() => {
    return city.toLowerCase()
  }, [ city ])

  const htmlID = useMemo(() =>
    `restaurant-list-${capitalizedCity}`, [capitalizedCity]
  )

  const restaurantList = useMemo(() => {
    const thisRestaurant = restaurants[lcCity]
    if (!thisRestaurant) return []
    if (!thisRestaurant.data) return []
    if (!thisRestaurant.data.restaurants) return []
    return thisRestaurant.data.restaurants
  }, [restaurants, city])

  const filteredList = useMemo(() => {
    if (!restaurantList.filter) return restaurantList
    return restaurantList
      .filter(r =>
        r.name.toLowerCase().includes(search) ||
        r.dishes.some(d => d.name.toLowerCase().includes(search))
      )
  }, [restaurantList, search])

  const close = (value) => {
    return () => {
      const newCities = cities.filter(c => c.toLowerCase() !== value)
      setCities(newCities)
    }
  }

  const statusItems = useMemo(() => {
    const totalText = `${restaurantList.length} ${restaurantList.length === 1
      ? 'restaurant'
      : 'restaurants'} in ${capitalizedCity}`
    const filteredText = `${filteredList.length} ${restaurantList.length === 1
      ? 'restaurant'
      : 'restaurants'} matching search term`

    return [totalText, filteredText]
  }, [restaurantList, capitalizedCity, filteredList])

  if (!restaurants[lcCity] && city) {
    return (
      <Window
        title='Loading...'
        id={htmlID}
        closeHandler={close(lcCity)}
      >
        Loading data for {capitalizedCity}...
      </Window>
    )
  }
  // for some reason api sometimes returns HTTP 200 even when city is not found?
  else if (restaurants[lcCity] === 'error' && city) {
    return (
      <Window
        title='Error'
        id={htmlID}
        closeHandler={close(lcCity)}
      >
        Error loading data for {capitalizedCity}
      </Window>
    )
  } else if
  (
    city && restaurants[lcCity] && restaurants[lcCity].data &&
      restaurants[lcCity].data.restaurants &&
      restaurants[lcCity].data.restaurants.length === 0
  )
  {
    return (
      <Window
        title='Error'
        id={htmlID}
        closeHandler={close(lcCity)}
      >
        No restaurants for {capitalizedCity}
      </Window>
    )
  } else if (!city) {
    return (
      <Window
        title='Waiting...'
        id={htmlID}
        closeHandler={close('')}
      >
        Waiting for input...
      </Window>
    )
  } else return (
    <Window
      id={htmlID}
      title={`Restaurants in ${capitalizedCity}`}
      statusItems={statusItems}
      closeHandler={close(lcCity)}
    >
      <ul className='tree-view restaurant-tree'>
        {
          filteredList.length > 0
            ? filteredList
              .map(r => {
                const ownVote = restaurants[lcCity].data.alreadyVoted
                return (<Restaurant
                  key={r.id}
                  restaurant={r}
                  results={results}
                  ownVote={ownVote}
                  setOwnVote={setOwnVote}
                  updateList={updateList}
                  updateResults={updateResults}
                />)
              })
            : `No restaurants matching "${search}"`
        }
      </ul>
    </Window>
  )
}

export default RestaurantList
