const DishList = ({ dishes }) => {
  return (
    <ul>
    { dishes.map(dish =>
        <li key={dish.name}>
          {dish.name}
          {dish.price ? ` (${dish.price})`: ''}
        </li>
      )
    }
    </ul>
  )
}

export default DishList
