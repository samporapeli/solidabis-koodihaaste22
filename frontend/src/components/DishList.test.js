import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DishList from './DishList'

const mockDishes = [
  {
    "name": "First test meal",
    "price": "10,90e",
    "attributes": []
  },
  {
    "name": "Keittiön valinta",
    "price": "10,90e",
    "attributes": []
  },
  {
    "name": "Linssikeitto",
    "price": "7,20e",
    "attributes": []
  },
  {
    "name": "Koodarin leike",
    "price": "12,20e",
    "attributes": []
  }
]

describe('Dish list', () => {
  it('should include all of the dishes', () => {
    const dl = render(<DishList dishes={mockDishes} />)
    mockDishes.forEach(dish => {
      expect(dl.container).toContainHTML(dish.name)
      expect(dl.container).toContainHTML(dish.price)
    })
  })
  it('should tell what is wrong with empty dish list', () => {
    const dl = render(<DishList dishes={[]} />)
    expect(dl.container).toContainHTML('No menu available')
  })
})
