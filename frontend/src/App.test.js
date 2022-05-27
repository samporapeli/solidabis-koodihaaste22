import { render, screen } from '@testing-library/react';
import App from './App';

test('renders result window', () => {
  render(<App />)
  const resultElement = screen.getByText('Results')
  expect(resultElement).toBeDefined()
})

test('renders city selection window', () => {
  render(<App />)
  const citySelectionElement = screen.getByText('City selection')
  expect(citySelectionElement).toBeDefined()
})

test('renders search window', () => {
  render(<App />)
  const searchElement = screen.getByText('Search')
  expect(searchElement).toBeDefined()
})

test('renders restaurant-list-container div', () => {
  const app = render(<App />)
  const div = app.container.querySelector('#restaurant-list-container')
  expect(div).toBeDefined()
})
