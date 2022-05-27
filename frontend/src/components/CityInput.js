import { useEffect, useState } from 'react'
import Window from '../ui/Window'

const CityInput = ({ cities, setCities, results }) => {
  const [ inputValue, setInputValue ] = useState('')
  const updateValue = (event) => {
    const value = event.target.value
    const cities = value.split(',')
    window.localStorage.setItem('CityInputValue', value)
    setInputValue(value)
    // update parent's state
    setCities(cities.map(c => c.trim()))
  }

  useEffect(() => {
    const LSValue = window.localStorage.getItem('CityInputValue')
    const resultCities = results.results ? new Set(results.results.map(r => r.city)) : ''
    const savedValue = LSValue ? LSValue : (new Array(...resultCities)).join(', ')
    setInputValue(savedValue)
    // hacky
    updateValue({
      target: { value: savedValue, }
    })
  }, [results])

  useEffect(() => {
    if (!cities) return
    setInputValue(cities.join(', '))
  }, [cities])

  // TODO: add buttons: load from results, clear input
  return (
    <Window id='city-selection' title='City selection'>
      <div className='field-row-stacked'>
        <label htmlFor='city-input'>
          Input cities separated by comma. Example: espoo, helsinki
        </label>
        <textarea
          id='city-input'
          value={inputValue}
          onChange={updateValue}
        />
      </div>
    </Window>
  )
}

export default CityInput
