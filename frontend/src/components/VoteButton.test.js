import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import VoteButton from './VoteButton'

describe('Vote button', () => {
  it('should render a non-disabled button with text "Vote"', () => {
    const ownVote = 'abc123'
    const v = render(<VoteButton restaurantID='aoe987' ownVote={ownVote} />)
    expect(v.container).toContainHTML('<button>Vote</button>')
    expect(v.container.querySelector('button')).not.toHaveAttribute('disabled')
  })
  it('should display "Unvote" when ownVote equals restaurantID', () => {
    const rID = 'abc123' 
    const ownVote = 'abc123'
    const v = render(<VoteButton restaurantID={rID} ownVote={ownVote} />)
    expect(rID).toEqual(ownVote)
    expect(v.container).toContainHTML('<button>Unvote</button>')
  })
  it('should change from "Vote" to "Wait..." after clicking and be disabled', async () => {
    const rID = '098xyz' 
    let ownVote = 'abc123'
    const v = render(<VoteButton restaurantID={rID} ownVote={ownVote} />)
    const user = userEvent.setup()

    expect(v.container).toContainHTML('Vote')
    await user.click(screen.getByText('Vote'))
    ownVote = rID
    expect(v.container).toContainHTML('Wait...')
    expect(v.container.querySelector('button')).toHaveAttribute('disabled')
  })
})
