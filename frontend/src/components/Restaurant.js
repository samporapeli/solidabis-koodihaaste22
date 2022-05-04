import DishList from './DishList'

const Restaurant = ({ restaurant }) => {
  return (
    <li key={restaurant.id}>
      {restaurant.name} ({restaurant.openingHours ? restaurant.openingHours : 'unknown'})
      <DishList dishes={restaurant.dishes} />
    </li>
  )
}

export default Restaurant
