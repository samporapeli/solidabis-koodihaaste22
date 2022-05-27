import Window from '../ui/Window'

const Search = ({ search, setSearch }) => {
  return (
    <Window title='Search' id='search-window'>
      <textarea
        value={search}
        onChange={(event) => setSearch(event.target.value.toLowerCase())}
      />
    </Window>
  )
}

export default Search
