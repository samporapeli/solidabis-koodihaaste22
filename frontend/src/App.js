import './App.scss'
import '98.css'
import { useEffect, useState } from 'react'
import CityInput from './components/CityInput'
import RestaurantList from './components/RestaurantList'
import Results from './components/Results'
import getDatestamp from './helpers/getDatestamp'

const App = () => {
  const [ cities, setCities ] = useState(null)
  const [ restaurants, setRestaurants ] = useState({})
  const [ results, setResults ] = useState({})

  return (
    <>
      <Results restaurants={restaurants} results={results} setResults={setResults} />
      <CityInput setCities={setCities} />
      <div id='restaurant-list-container'>
      { cities
        ? cities.map(c =>
          <RestaurantList
            key={c}
            city={c}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
            results={results}
          />
        )
        : 'Waiting for input...'
      }
      </div>
    </>
  )
}

export default App
