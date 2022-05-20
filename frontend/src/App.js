import './App.css'
import { useEffect, useState } from 'react'
import RestaurantList from './components/RestaurantList'
import CityInput from './components/CityInput'

const App = () => {
  const [ cities, setCities ] = useState(null)
  const [ ownVotes, setOwnVotes ] = useState([])

  const getDatestamp = () => (new Date()).toISOString().split('T')[0]

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
      <h1>Today's lunch options</h1>
      <CityInput setCities={setCities} />
      { cities
        ? cities.map(c =>
          <RestaurantList key={c} city={c} ownVotes={ownVotes} updateOwnVotes={updateOwnVotes} />
        )
        : 'Waiting for input...'
      }
    </>
  )
}

export default App
