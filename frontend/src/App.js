import './App.css'
import { useEffect, useState } from 'react'
import CityInput from './components/CityInput'
import RestaurantList from './components/RestaurantList'
import Results from './components/Results'
import getDatestamp from './helpers/getDatestamp'

const App = () => {
  const [ cities, setCities ] = useState(null)
  const [ restaurants, setRestaurants ] = useState({})
  const [ ownVotes, setOwnVotes ] = useState([])

  const updateOwnVotes = (restaurantID, action) => {
    let newVotes = []
    if (action === 'add') {
      newVotes = [...ownVotes, restaurantID]
    } else if (action === 'remove') {
      newVotes = ownVotes.filter(id => id !== restaurantID)
    }
    setOwnVotes(newVotes)
    window.localStorage.setItem(`${getDatestamp()}-ownVotes`, JSON.stringify(newVotes))
  }

  useEffect(() => {
    const lsVotes = window.localStorage.getItem(`${getDatestamp()}-ownVotes`)
    if (lsVotes) {
      setOwnVotes(JSON.parse(lsVotes))
    } else {
      setOwnVotes([])
    }
  }, [])

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
            ownVotes={ownVotes}
            updateOwnVotes={updateOwnVotes}
          />
        )
        : 'Waiting for input...'
      }
    </>
  )
}

export default App
