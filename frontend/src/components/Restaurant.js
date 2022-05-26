import DishList from './DishList'
import VoteButton from './VoteButton'
import RestaurantVotes from './RestaurantVotes'

const Restaurant = ({ restaurant, results, ownVotes, updateList }) => {
  return (
    <li key={restaurant.id}>
      {restaurant.name} ({restaurant.openingHours ? restaurant.openingHours : 'unknown'})
      <VoteButton restaurantID={restaurant.id} ownVotes={ownVotes} updateList={updateList} />
      <RestaurantVotes restaurant={restaurant} results={results} />
      <DishList dishes={restaurant.dishes} />
    </li>
  )
}

export default Restaurant
