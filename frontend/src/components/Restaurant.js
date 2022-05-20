import DishList from './DishList'
import VoteButton from './VoteButton'
import RestaurantVotes from './RestaurantVotes'

const Restaurant = ({ restaurant, ownVotes, updateOwnVotes }) => {
  return (
    <li key={restaurant.id}>
      {restaurant.name} ({restaurant.openingHours ? restaurant.openingHours : 'unknown'})
      <VoteButton restaurantID={restaurant.id} ownVotes={ownVotes} updateOwnVotes={updateOwnVotes} />
      <RestaurantVotes restaurant={restaurant} />
      <DishList dishes={restaurant.dishes} />
    </li>
  )
}

export default Restaurant
