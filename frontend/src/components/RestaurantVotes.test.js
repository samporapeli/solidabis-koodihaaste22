import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantVotes from './RestaurantVotes'

const mockResults = {
	"date": "2022-05-27",
	"results": [
		{
			"votes": 3,
			"restaurantid": "dd67f4077788df4da5136e96c8f711c5132fbf23e11c77bc9e825af3c3cc7f43",
			"name": "Shell HelmiSimpukka Espoo Vallikallio",
			"city": "Espoo"
		},
		{
			"votes": 1,
			"restaurantid": "0142a9a6fa4a15bfbc6256a3423255e6fdbdb15b2ba5422084b18a5b481ae926",
			"name": "Delhi Rasoi Kauniainen",
			"city": "Kauniainen"
		},
		{
			"votes": 1,
			"restaurantid": "065f23f3922c8c083d68259566a2fd62f9da83f9d8e22d266fa7d8a00542960a",
			"name": "Bistro O Mat Kirkkonummi",
			"city": "Kirkkonummi"
		},
		{
			"votes": 1,
			"restaurantid": "b87464da8d7635b707a5c4855955251701cfc1885488164e3e2911a3a8883cfd",
			"name": "Friends & Brgrs Espoo",
			"city": "Espoo"
		}
	]
}

const mockRestaurantA = {
  id: "0142a9a6fa4a15bfbc6256a3423255e6fdbdb15b2ba5422084b18a5b481ae926",
}

const mockRestaurantB = {
  id: "dd67f4077788df4da5136e96c8f711c5132fbf23e11c77bc9e825af3c3cc7f43",
}

describe('Restaurant votes', () => {
  it('should show right amount of votes', () => {
    const rv = render(<RestaurantVotes restaurant={mockRestaurantA} results={mockResults} />)
    expect(rv.container).toContainHTML('1')
  })
  it('should handle plural form of "vote"', () => {
    const rv = render(<RestaurantVotes restaurant={mockRestaurantB} results={mockResults} />)
    expect(rv.container).toContainHTML('3 votes')
  })
  it('should handle singular form of "vote"', () => {
    const rv = render(<RestaurantVotes restaurant={mockRestaurantA} results={mockResults} />)
    expect(rv.container).toContainHTML('1 vote')
  })
})
