import React, { useEffect, useState } from 'react'
import capitalizeCity from '../helpers/capitalizeCity'
import Window from '../ui/Window'

// define function outside the component to avoid useEffect dependency problems and warnings
// https://stackoverflow.com/a/58959607
const onResultChange = ({ results, loadResultCities, setInputValue, updateValue }) => {
  // prevent setting an empty value to LS before getting a chance
  // to check for result restaurants
  if (!results.results) return
  const LSValue = window.localStorage.getItem('CityInputValue')
  if (!LSValue) {
    loadResultCities()
    return
  }
  try {
    const value = JSON.parse(LSValue).value
    setInputValue(value)
    // mocking event, hacky
    updateValue({
      target: { value, }
    })
  } catch {
    loadResultCities()
  }
}

const CityInput = ({ cities, setCities, results }) => {
  const [ inputValue, setInputValue ] = useState('')

  const updateValue = (event) => {
    const value = event.target.value
    const cities = new Array(
      ...new Set(
        value
          .split(',')
          .map(c => capitalizeCity(c.toLowerCase()))
      )
    )
    const prettyValue = cities.join(',')
    // save in JSON instead of string to identify empty value from
    // null (non-set) value
    window.localStorage.setItem('CityInputValue', JSON.stringify({
      value: prettyValue,
    }))
    setInputValue(prettyValue)
    // update parent's state
    // and prevent infinite loops...
    if (!event.doNotUpdateCities)
      setCities(cities.map(c => c.trim()))
  }

  const loadResultCities = () => {
    const resultCities = results.results ? new Set(results.results.map(r => r.city)) : new Set()
    const resultString = (new Array(...resultCities)).join(',')
    updateValue({
      target: { value: resultString, }
    })
  }

  useEffect(() => {
    onResultChange({ results, loadResultCities, setInputValue, updateValue })
  }, [results])

  useEffect(() => {
    if (!cities) return
    updateValue({
      target: { value: cities.join(',') },
      doNotUpdateCities: true,
    })
  }, [cities])

  return (
    <Window id='city-selection' title='City selection'>
      <div className='field-row-stacked'>
        <label htmlFor='city-input'>
          Input cities separated by comma. Example: espoo,helsinki
        </label>
        <textarea
          id='city-input'
          value={inputValue}
          onChange={updateValue}
        />
      </div>
      <div className='field-row'>
        <button
          onClick={loadResultCities}
          disabled={results.results ? results.results.length === 0 : true}
        >
          Load cities from results
        </button>
        <button
          onClick={(event) => { event.target.value = ''; updateValue(event) }}
        >
          Clear
        </button>
      </div>
    </Window>
  )
}

export default CityInput
