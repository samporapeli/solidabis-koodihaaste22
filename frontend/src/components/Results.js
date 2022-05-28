import { useEffect, useMemo } from 'react'
import voteService from '../services/voteService'
import DishList from './DishList'
import Window from '../ui/Window'

const Results = ({ restaurants, results, setResults, forceUpdated }) => {

  const updateResults = async () => {
    const result = await voteService.getResults()
    setResults(result.data)
  }

  const voteAmount = useMemo(() => {
    if (!results.results) return 0
    return results.results.reduce((sum, result) => sum + result.votes, 0)
  }, [results])

  // load results
  useEffect(() => {
    updateResults()
  }, [forceUpdated])

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
          `Votes: ${results.results ? voteAmount : '-'}`,
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
