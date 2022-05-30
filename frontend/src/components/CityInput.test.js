import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import CityInput from './CityInput'

const emptyResults = {
  'date': '2022-05-28',
  'results': []
}

const mockResults = {
  'date': '2022-05-28',
  'results': [
    {
      'votes': 1,
      'restaurantid': 'b72d461c1fe27d781d244eab9704ffff5b49c9e675fd685d2a6e3960724afcf3',
      'name': 'Shell HelmiSimpukka Espoo Lahnus',
      'city': 'Espoo'
    }
  ]
}

describe('City input', () => {
  it('should render two buttons and a textarea', () => {
    const ci = render(<CityInput results={emptyResults} cities={[]} setCities={() => {}} />)
    expect(ci.container.querySelectorAll('.window-body * button')).toHaveLength(2)
    expect(ci.container.querySelectorAll('.window-body * button')[0]).toHaveAttribute('disabled')
    expect(ci.container.querySelectorAll('.window-body * button')[1]).not.toHaveAttribute('disabled')
  })
  it('should render "Load cities from results" as enabled with non-empty result list', () => {
    const ci = render(<CityInput results={mockResults} cities={[]} setCities={() => {}} />)
    expect(ci.container.querySelectorAll('.window-body * button')[0]).not.toHaveAttribute('disabled')
  })
  it('should set cities correctly on input', async () => {
    const mockSet = jest.fn()
    render(<CityInput results={mockResults} cities={[]} setCities={mockSet} />)
    const user = userEvent.setup()

    await user.type(screen.getByRole('textbox'), 'abc, 123,abba')

    expect(mockSet.mock.lastCall[0]).toHaveLength(3)
    expect(mockSet.mock.lastCall[0]).toEqual(['Abc', '123', 'Abba'])
  })
  it('should not allow duplicate cities', async () => {
    const c = render(<CityInput results={mockResults} cities={[]} setCities={() => {}} />)
    const user = userEvent.setup()

    await user.type(screen.getByRole('textbox'), 'espoo,Espoo,eSPOO,iisalmi,ESPOO,IISALMI,espoo')

    expect(c.container).toContainHTML('Espoo,Iisalmi')
  })
  it('should clear cities when clicked clear button', async () => {
    const mockSet = jest.fn()
    render(<CityInput results={mockResults} cities={[]} setCities={mockSet} />)
    const user = userEvent.setup()

    await user.type(screen.getByRole('textbox'), 'abc, 123abba')

    await user.click(screen.getByText('Clear'))
    expect(mockSet.mock.lastCall[0]).toEqual([''])
  })
  it('should set input value by cities', () => {
    render(<CityInput results={mockResults} cities={['cityA', 'cityB']} setCities={() => {}} />)
    expect(screen.getByRole('textbox')).toContainHTML('Citya,Cityb')
  })
  it('should access localstorage', () => {
    // thanks https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(0)
    expect(window.localStorage.setItem.mock.lastCall).not.toBeDefined()
    render(<CityInput results={mockResults} cities={['cityA', 'cityB']} setCities={() => {}} />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
    expect(window.localStorage.setItem.mock.lastCall[1]).toEqual(JSON.stringify({
      value: 'Citya,Cityb'
    }))
  })
})
