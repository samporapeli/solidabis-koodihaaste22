import { useEffect, useState } from 'react'
import voteService from '../services/voteService'
import DishList from './DishList'

const Results = ({ restaurants }) => {
  const [ results, setResults ] = useState(null)

  const updateResults = async () => {
    const result = await voteService.getResults()
    setResults(result.data)
  }

  // load results
  useEffect(() => {
    updateResults()
  }, [])

  // update results every second
  useEffect(() => {
    const interval = setInterval(() => updateResults(), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      { results ? results.results.map(r =>
                      // render the city if it's not included in the name :)
        <h4 key={r.restaurantid}>{r.name} {r.name.includes(r.city) ? '' : r.city} ({r.votes} {r.votes === 1 ? 'vote' : 'votes' })</h4>
      ) : 'Loading...' }
    </>
  )
}

export default Results
