const CityInput = ({ setCities }) => {
  const updateValue = (event) => {
    const value = event.target.value
    const cities = value.split(',')
    // update parent's state
    setCities(cities.map(c => c.trim()))
  }

  return (
    <>
      Input a city
      <input onChange={updateValue}/>
      <br />
    </>
  )
}

export default CityInput
