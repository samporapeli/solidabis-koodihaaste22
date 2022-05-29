import './App.scss'
import '98.css'
import { useState } from 'react'
import CityInput from './components/CityInput'
import Search from './components/Search'
import RestaurantList from './components/RestaurantList'
import Results from './components/Results'

const App = () => {
  const [ cities, setCities ] = useState(null)
  const [ restaurants, setRestaurants ] = useState({})
  const [ results, setResults ] = useState({})
  const [ search, setSearch ] = useState('')
  const [ resultsForceUpdated, setResultsForceUpdated ] = useState(+(new Date()))

  const updateResults = () => {
    setResultsForceUpdated(+(new Date()))
  }

  return (
    <>
      <h1>Lunch voting</h1>
      <div id='top-item-container'>
        <Results
          restaurants={restaurants}
          results={results}
          setResults={setResults}
          forceUpdated={resultsForceUpdated}
        />
        <CityInput cities={cities} setCities={setCities} results={results} />
        <Search search={search} setSearch={setSearch} />
      </div>
      <h2>Restaurants by city</h2>
      <div id='restaurant-list-container'>
      { cities
        ? cities.map(c =>
          <RestaurantList
            key={c}
            city={c}
            cities={cities}
            setCities={setCities}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
            results={results}
            search={search}
            setOwnVote={(id) => {
              setRestaurants((current) => {
                const keys = Object.keys(current)
                const newData = {...current}
                keys.forEach(key => {
                  if (newData[key].data)
                    newData[key].data.alreadyVoted = id
                })
                return newData
              })
            }}
            updateResults={updateResults}
          />
        )
        : 'Waiting for input...'
      }
      </div>
    </>
  )
}

export default App
