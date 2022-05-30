import React from 'react'
import Window from '../ui/Window'

const Search = ({ search, setSearch }) => {
  return (
    <Window title='Search' id='search-window'>
      <label htmlFor='search-input'>Filter restaurants by name or dish</label>
      <textarea
        id='search-input'
        value={search}
        onChange={(event) => setSearch(event.target.value.toLowerCase())}
      />
    </Window>
  )
}

export default Search
