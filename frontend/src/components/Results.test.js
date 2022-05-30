import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Results from './Results'

const mockResults = {
  'date': '2022-05-27',
  'results': [
    {
      'votes': 21,
      'restaurantid': 'f95d7d3a-3bfc-4427-a621-bc788c0da040',
      'name': 'Kirkkonummelainen esimerkkiravintola',
      'city': 'Kirkkonummi'
    },
    {
      'votes': 2,
      'restaurantid': '2c0486fc-d4a5-4ad5-aa2a-3f0c0e87c439',
      'name': 'Mikkelin ruoka&juoma',
      'city': 'Mikkeli'
    }
  ]
}

describe('Result view', () => {
  it('should render the result window', () => {
    const r = render(<Results results={mockResults} setResults={() => {}} />)
    expect(r.container.querySelector('.title-bar-text')).toContainHTML('Results')
  })
  it('should render the date', () => {
    const r = render(<Results results={mockResults} setResults={() => {}} />)
    expect(r.container.querySelector('.status-bar')).toContainHTML(mockResults.date)
  })
  it('should show the total amount of votes', () => {
    const r = render(<Results results={mockResults} setResults={() => {}} />)
    let sum = 0
    mockResults.results.forEach(r => sum += r.votes)
    expect(r.container.querySelectorAll('.status-bar-field')[0]).toContainHTML(`Votes: ${sum}`)
  })
  it('should show the restaurant leaderboard', () => {
    const r = render(<Results results={mockResults} setResults={() => {}} />)
    expect(r.container.querySelectorAll('li')).toHaveLength(2)
    expect(r.container.querySelectorAll('li')[0]).toContainHTML(mockResults.results[0].name)
    expect(r.container.querySelectorAll('li')[0]).toContainHTML(mockResults.results[0].city)
    expect(r.container.querySelectorAll('li')[0]).toContainHTML(mockResults.results[0].votes.toString())
    expect(r.container.querySelectorAll('li')[1]).toContainHTML(mockResults.results[1].name)
    expect(r.container.querySelectorAll('li')[1]).toContainHTML(mockResults.results[1].city)
    expect(r.container.querySelectorAll('li')[1]).toContainHTML(mockResults.results[1].votes.toString())
  })
  it('should show "No votes today" in case result list is empty', () => {
    render(<Results results={{ results:[] }} setResults={() => {}} />)
    expect(screen.getByText('No votes today')).toBeDefined()
  })
})
