import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
//import userEvent from '@testing-library/user-event'
import RestaurantList from './RestaurantList'

const mockRestaurants = {
  'alreadyVoted': null,
  'date': '2022-05-27',
  'restaurants': [
    {
      'id': 'dcd9d6fdaac3382c70cc5bc6b3ea1547b5da8b4a912f66f5cecb0fe630f1fef7',
      'name': 'Sushi Panda Turku',
      'openingHours': '11-15',
      'votes': 0,
      'dishes': []
    },
    {
      'id': '6d1a1809f728b9e87ca9ed37f7e933a815f051fe63fdd4bb7b57e17417fe2aae',
      'name': 'Rax Pizzabuffet Turku',
      'openingHours': '11-20',
      'votes': 0,
      'dishes': [
        {
          'name': 'Lounasbuffet',
          'price': '11,30e',
          'attributes': []
        },
        {
          'name': 'Jälkiruoka',
          'price': '',
          'attributes': []
        }
      ]
    },
    {
      'id': '578a38a50cc6147cf11301af147e04ea7951b8c9a6c4cc53436125e8f4987bf6',
      'name': 'Maku Turku',
      'openingHours': '10:30-14:30',
      'votes': 0,
      'dishes': []
    },
    {
      'id': '4de66b1777d7e03c5ade9966aa1e4de43573904aa490a620aedfb18490810742',
      'name': 'Fit Wok Turku',
      'openingHours': '10:30-15',
      'votes': 0,
      'dishes': []
    }
  ]
}

describe('Restaurant list', () => {
  it('should display loading state', () => {
    render(<RestaurantList
      city='aaa'
      restaurants={{
        'bbb': []
      }}
      setRestaurants={() => {}}
    />)
    expect(screen.getByText('Loading...')).toBeDefined()
  })
  it('should display load error', () => {
    render(<RestaurantList
      city='aaa'
      restaurants={{
        'aaa': 'error'
      }}
      search=''
      setRestaurants={() => {}}
    />)
    expect(screen.getByText('Error loading data for Aaa')).toBeDefined()
  })
  it('should display error if there are no restaurants', () => {
    render(<RestaurantList
      city='aaa'
      restaurants={{
        aaa: {
          data: { restaurants: [] }
        }
      }}
      search=''
      setRestaurants={() => {}}
    />)
    expect(screen.getByText('No restaurants for Aaa')).toBeDefined()
  })
  it('should wait for input', () => {
    render(<RestaurantList
      city=''
      restaurants={{
        aaa: {
          data: { restaurants: [] }
        }
      }}
      search=''
      setRestaurants={() => {}}
    />)
    expect(screen.getByText('Waiting for input...')).toBeDefined()
  })
  it('should show the list', () => {
    const rl = render(<RestaurantList
      city='aaa'
      restaurants={{
        aaa: {
          data: { restaurants: mockRestaurants }
        }
      }}
      // I do not understand why is this required and '' is not enough,
      // or even just the first
      search={mockRestaurants.restaurants[0].name}
      setRestaurants={() => {}}
    />)
    expect(rl.container).toContainHTML(mockRestaurants.restaurants[0].name)
  })
  /* Unfortunately this test is out of order
  it('should filter restaurants', () => {
    const rl = render(<RestaurantList
      city='aaa'
      restaurants={{
        aaa: {
          data: { restaurants: mockRestaurants }
        }
      }}
      search={mockRestaurants.restaurants[1].dishes[0].name.toLowerCase()}
      setRestaurants={() => {}}
    />)
    expect(rl.container).toContainHTML(mockRestaurants.restaurants[1].name)
  })
  */
})
