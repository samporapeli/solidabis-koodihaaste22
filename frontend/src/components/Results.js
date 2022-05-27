import { useEffect } from 'react'
import voteService from '../services/voteService'
import DishList from './DishList'
import Window from '../ui/Window'

const Results = ({ restaurants, results, setResults }) => {

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
    <Window
      id='results'
      title='Results'
      statusItems={[
          `Votes: ${results.results ? results.results.length : '-'}`,
          `Date: ${results.date ? results.date : '-'}`,
      ]}
    >
      {
        results.results && results.results.length === 0
        ? <p>No votes today</p>
        : <ol>
          {
            results.results ? results.results.map(r => (
              <li key={r.restaurantid}>
                {/* render the city if it's not included in the name :) */}
                {r.name} {r.name.includes(r.city) ? '' : r.city}
                ({r.votes} {r.votes === 1 ? 'vote' : 'votes' })
              </li>
            )) : 'Loading...'
          }
          </ol>
      }
    </Window>
  )
}

export default Results
