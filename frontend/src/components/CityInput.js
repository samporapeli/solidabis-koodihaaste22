import { useEffect, useState } from 'react'
import Window from '../ui/Window'

const CityInput = ({ setCities }) => {
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
    const savedValue = LSValue ? LSValue : ''
    setInputValue(savedValue)
    // hacky
    updateValue({
      target: { value: savedValue, }
    })
  }, [])

  return (
    <Window id='city-selection' title='City selection'>
      <div className='field-row-stacked'>
        <label for='city-input'>
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
