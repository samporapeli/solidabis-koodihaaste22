import './App.scss'
import '98.css'
import { useEffect, useState } from 'react'
import CityInput from './components/CityInput'
import Search from './components/Search'
import RestaurantList from './components/RestaurantList'
import Results from './components/Results'
import getDatestamp from './helpers/getDatestamp'

const App = () => {
  const [ cities, setCities ] = useState(null)
  const [ restaurants, setRestaurants ] = useState({})
  const [ results, setResults ] = useState({})
  const [ search, setSearch ] = useState('')

  return (
    <>
      <Results restaurants={restaurants} results={results} setResults={setResults} />
      <CityInput setCities={setCities} />
      <Search search={search} setSearch={setSearch} />
      <div id='restaurant-list-container'>
      { cities
        ? cities.map(c =>
          <RestaurantList
            key={c}
            city={c}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
            results={results}
            search={search}
          />
        )
        : 'Waiting for input...'
      }
      </div>
    </>
  )
}

export default App
