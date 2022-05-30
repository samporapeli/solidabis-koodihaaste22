import React from 'react'
import DishList from './DishList'
import VoteButton from './VoteButton'
import RestaurantVotes from './RestaurantVotes'

const Restaurant = ({
  restaurant,
  results,
  ownVote,
  updateList,
  setOwnVote,
  updateResults
}) => {
  return (
    <li key={restaurant.id}>
      <strong>{restaurant.name}</strong> ({restaurant.openingHours ? restaurant.openingHours : 'unknown'})
      <span className='restaurant-vote-section'>
        <RestaurantVotes restaurant={restaurant} results={results} />
        <VoteButton
          restaurantID={restaurant.id}
          ownVote={ownVote}
          setOwnVote={setOwnVote}
          updateList={updateList}
          updateResults={updateResults}
        />
      </span>
      <DishList dishes={restaurant.dishes} />
    </li>
  )
}

export default Restaurant
