const DishList = ({ dishes }) => {
  if (!dishes.length)
    return (
      <li>No menu available</li>
    )
  else
    return (
      <details open>
        <summary>Menu</summary>
        <ul>
        { dishes.map(dish =>
            <li key={dish.name}>
              {dish.name}
              {dish.price ? ` (${dish.price})`: ''}
            </li>
          )
        }
        </ul>
      </details>
    )
}

export default DishList
