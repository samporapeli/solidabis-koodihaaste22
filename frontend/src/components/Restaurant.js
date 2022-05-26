import DishList from './DishList'
import VoteButton from './VoteButton'
import RestaurantVotes from './RestaurantVotes'

const Restaurant = ({ restaurant, results, ownVotes, updateList }) => {
  return (
    <li key={restaurant.id}>
      <strong>{restaurant.name}</strong> ({restaurant.openingHours ? restaurant.openingHours : 'unknown'})
      <span className='restaurant-vote-section'>
        <RestaurantVotes restaurant={restaurant} results={results} />
        <VoteButton restaurantID={restaurant.id} ownVotes={ownVotes} updateList={updateList} />
      </span>
      <DishList dishes={restaurant.dishes} />
    </li>
  )
}

export default Restaurant
