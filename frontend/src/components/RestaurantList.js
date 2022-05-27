import { useEffect, useMemo, useState } from 'react'
import restaurantService from '../services/restaurantService'
import capitalizeCity from '../helpers/capitalizeCity'
import Restaurant from './Restaurant'
import Window from '../ui/Window'

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
    const thisRestaurant = restaurants[city.toLowerCase()]
    if (!thisRestaurant) return []
    if (!thisRestaurant.data) return []
    if (!thisRestaurant.data.restaurants) return []
    return thisRestaurant.data.restaurants
  }, [restaurants, city])

  const filteredList = useMemo(() => 
    restaurantList
      .filter(r =>
        r.name.toLowerCase().includes(search) ||
        r.dishes.some(d => d.name.toLowerCase().includes(search))
      )
  , [restaurantList, search])

  const close = (value) => {
    return () => {
      const newCities = cities.filter(c => c.toLowerCase() !== value)
      setCities(newCities)
    }   
  }

  if (!restaurants[lcCity]) {
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
  else if (!restaurants[lcCity] === 'error' && city) {
    return (
      <Window
        title='Error'
        id={htmlID}
        closeHandler={close(lcCity)}
      >
        Error loading data for {capitalizedCity}
      </Window>
    )
  } else if (city && restaurants[lcCity] && restaurants[lcCity].data && restaurants[lcCity].data.restaurants && restaurants[lcCity].data.restaurants.length === 0) {
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
      statusItems={[
        `${restaurantList.length} ${restaurantList.length === 1
            ? 'restaurant'
            : 'restaurants'} in ${capitalizedCity}`,
        `${filteredList.length} ${restaurantList.length === 1
            ? 'restaurant'
            : 'restaurants'} matching search term`,
      ]}
      closeHandler={close(lcCity)}
    >
      <ul className='tree-view restaurant-tree'>
        {
          filteredList.length > 0
          ? filteredList
            .map(r => {
              const ownVote = restaurants[city.toLowerCase()].data.alreadyVoted
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
