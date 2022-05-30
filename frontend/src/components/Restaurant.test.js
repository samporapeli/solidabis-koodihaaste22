import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Restaurant from './Restaurant'

const mockRestaurantA = {
  'id': 'f31a4073242b90dd9d72e7c5d224d26e1fa0f91525b4c65754b3f42adf32531b',
  'name': 'Neste Naantali',
  'openingHours': '10:30-15',
  'votes': 0,
  'dishes': []
}

const mockRestaurantB = {
  'id': '3f1a4073242b90dd9d72e7c5d224d26e1fa0f91525b4c65754b3f42adf32531b',
  'name': 'Kiinteä Naantali',
  'openingHours': null,
  'votes': 2,
  'dishes': []
}

describe('Restaurant', () => {
  it('should display its name and opening hours', () => {
    render(<Restaurant restaurant={mockRestaurantA} results={null} />)
    expect(screen.getByText(mockRestaurantA.name)).toBeDefined()
    expect(screen.getByText(`(${mockRestaurantA.openingHours})`)).toBeDefined()
  })
  it('should display "unknown" if opening hours are not known', () => {
    render(<Restaurant restaurant={mockRestaurantB} results={null} />)
    expect(screen.getByText('(unknown)')).toBeDefined()
  })
})
