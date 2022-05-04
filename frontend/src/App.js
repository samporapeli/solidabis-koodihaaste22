import './App.css'
import { useState } from 'react'
import RestaurantList from './components/RestaurantList'
import CityInput from './components/CityInput'

const App = () => {
  const [ cities, setCities ] = useState(null)

  return (
    <>
      <h1>Today's lunch options</h1>
      <CityInput setCities={setCities} />
      { cities
        ? cities.map(c =>
          <RestaurantList key={c} city={c} />
        )
        : 'Waiting for input...'
      }
    </>
  )
}

export default App
