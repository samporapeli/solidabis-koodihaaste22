// only changes the first letter to uppercase
// thus it doesn't work for cities like 'Mänttä-Vilppula'
const capitalizeCity = (city) => {
  if (city.length === 0) return city
  return city.replace(city[0], city[0].toUpperCase())
}

export default capitalizeCity
