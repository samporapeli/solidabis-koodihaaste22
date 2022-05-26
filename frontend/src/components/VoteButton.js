import { useEffect, useState } from 'react'
import voteService from '../services/voteService'

const VoteButton = ({ restaurantID, ownVotes, updateList }) => {
  const [ voted, setVoted ] = useState(false)
  const [ buttonText, setButtonText ] = useState('Loading...')

  const updateButtonText = () => {
    setButtonText(! voted ? 'Vote' : 'Unvote')
  }

  useEffect(() => {
    updateButtonText()
  }, [ voted, ownVotes ])

  useEffect(() => {
    setVoted(ownVotes === restaurantID)
  }, [ ownVotes, restaurantID ])

  const vote = async () => {
    setButtonText('Wait...')
    const result = await voteService.voteRestaurant(restaurantID)
    if (result.status === 200) {
      setVoted(!voted)
      updateList()
    } else {
      alert(`Failed to vote! (HTTP ${result.status})`)
    }
    updateButtonText()
  }

  return (
    <button onClick={vote}>{buttonText}</button>
  )
}

export default VoteButton
