import React from 'react'
import { useEffect, useState } from 'react'
import voteService from '../services/voteService'

const VoteButton = ({ restaurantID, ownVote, setOwnVote, updateResults }) => {
  const [ voted, setVoted ] = useState(false)
  const [ buttonText, setButtonText ] = useState('Loading...')

  const updateButtonText = () => {
    setButtonText(! voted ? 'Vote' : 'Unvote')
  }

  useEffect(() => {
    updateButtonText()
  }, [ voted, ownVote ])

  useEffect(() => {
    setVoted(ownVote === restaurantID)
  }, [ ownVote, restaurantID ])

  const waitText = 'Wait...'

  const vote = async () => {
    setButtonText(waitText)
    const result = await voteService.voteRestaurant(restaurantID)
    if (result.status === 200) {
      setVoted(!voted)
      setOwnVote(restaurantID)
      updateResults()
    } else {
      alert(`Failed to vote! (HTTP ${result.status})`)
    }
    updateButtonText()
  }

  return (
    <button
      onClick={vote}
      disabled={buttonText === waitText}
    >
      {buttonText}
    </button>
  )
}

export default VoteButton
