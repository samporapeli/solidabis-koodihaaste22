import { useEffect, useState } from 'react'
import voteService from '../services/voteService'

const VoteButton = ({ restaurantID, ownVotes, updateOwnVotes }) => {
  const [ voted, setVoted ] = useState(false)
  const [ buttonText, setButtonText ] = useState('Loading...')

  const updateButtonText = () => {
    setButtonText(! voted ? 'Vote' : 'Unvote')
  }

  useEffect(() => {
    updateButtonText()
  }, [ voted ])

  useEffect(() => {
    setVoted(ownVotes.includes(restaurantID))
  }, [ ownVotes, restaurantID ])

  const vote = async () => {
    setButtonText('Wait...')
    const result = await voteService.voteRestaurant(restaurantID)
    if (result.status === 200) {
      if (voted) {
        updateOwnVotes(restaurantID, 'remove')
        setVoted(false)
      } else {
        updateOwnVotes(restaurantID, 'add')
        setVoted(true)
      }
    }
    updateButtonText()
  }

  return (
    <button onClick={vote}>{buttonText}</button>
  )
}

export default VoteButton
