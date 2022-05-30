import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import About from './About'

describe('About window', () => {
  it('should render text and links', () => {
    const a = render(<About />)
    expect(a.container.querySelectorAll('a').length).toBeGreaterThan(0)
    expect(a.container).toContainHTML('Solidabis')
    expect(a.container).toContainHTML('sampo.website')
    expect(a.container).toContainHTML('License')
  })
  it('should not contain "undefined" values', () => {
    // could happen if env variables are not properly set
    const a = render(<About />)
    expect(a.container).not.toContainHTML('undefined')
  })
})
