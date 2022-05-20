import { useEffect, useState } from 'react'

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
    const savedValue = window.localStorage.getItem('CityInputValue')
    setInputValue(savedValue)
    // hacky
    updateValue({
      target: { value: savedValue, }
    })
  }, [])

  return (
    <>
      Input a city
      <input value={inputValue} onChange={updateValue}/>
      <br />
    </>
  )
}

export default CityInput
