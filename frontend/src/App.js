import './App.css'
import { useEffect, useState } from 'react'
import CityInput from './components/CityInput'
import RestaurantList from './components/RestaurantList'
import Results from './components/Results'
import getDatestamp from './helpers/getDatestamp'

const App = () => {
  const [ cities, setCities ] = useState(null)
  const [ restaurants, setRestaurants ] = useState({})

  return (
    <>
      <h2>Results</h2>
      <Results restaurants={restaurants} />
      <h2>Today's lunch options</h2>
      <CityInput setCities={setCities} />
      { cities
        ? cities.map(c =>
          <RestaurantList
            key={c}
            city={c}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
          />
        )
        : 'Waiting for input...'
      }
    </>
  )
}

export default App
