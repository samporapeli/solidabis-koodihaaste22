import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import Search from './Search'

describe('Search component should...', () => {
  it('render a window with textarea', () => {
    const s = render(<Search />)
    expect(s.container.querySelector('#search-window')).toBeDefined()
    expect(s.container).toContainHTML('Search')
    expect(s.container.querySelector('textarea')).toBeDefined()
  })
  it('be empty initially', () => {
    const s = render(<Search />)
    expect(s.container.querySelector('textarea').value).toEqual('')
  })
  it('accept typing', async () => {
    const text = 'Just some text for search input'
    const user = userEvent.setup()
    const s = render(<Search setSearch={() => {}} />)
    
    await user.type(screen.getByRole('textbox'), text)

    expect(s.container.querySelector('textarea').value).not.toEqual('')
    expect(s.container.querySelector('textarea').value).toEqual(text)
  })
  it('call the setSearch function with inputted value (in lowercase)', async () => {
    const text = 'Another text to input'
    const user = userEvent.setup()
    const setSearch = jest.fn()
    const s = render(<Search setSearch={setSearch} />)

    await user.type(screen.getByRole('textbox'), text)

    expect(setSearch.mock.calls).toHaveLength(text.length)
    expect(setSearch.mock.lastCall[0]).toEqual(text.toLowerCase())
  })
})
