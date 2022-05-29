const DishList = ({ dishes }) => {
  if (!dishes.length || dishes.every(d => d.name === ''))
    return (
      <ul>
        <li>No menu available</li>
      </ul>
    )
  else
    return (
      <ul>
        <li>
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
        </li>
      </ul>
    )
}

export default DishList
