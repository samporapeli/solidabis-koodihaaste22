import { useEffect, useState } from 'react'

const RestaurantVotes = ({ restaurant, results }) => {
  const [ votes, setVotes ] = useState(0)

  useEffect(() => {
    if (!results.results)
      return
    const resultRestaurant = results.results.find(r => r.restaurantid === restaurant.id)
    if (resultRestaurant) {
      setVotes(resultRestaurant.votes)
    }
  }, [ results ])

  return (
    <span className='restaurant-vote-count'><em>{ votes } { votes === 1 ? 'vote' : 'votes' }</em></span>
  )
}

export default RestaurantVotes