const RestaurantVotes = ({ restaurant }) => {
  return (
    <span>{ restaurant.votes } { restaurant.votes === 1 ? 'vote' : 'votes' }</span>
  )
}

export default RestaurantVotes
