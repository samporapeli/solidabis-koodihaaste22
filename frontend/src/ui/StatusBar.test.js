import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StatusBar from './StatusBar'

test('status bar should render no items', () => {
  const sb = render(<StatusBar />)
  expect(sb.container).toContainHTML('<div class="status-bar">')
})

test('status bar should render one item', () => {
  const content = 'status bar item #1'
  const sb = render(<StatusBar items={[ content ]} />)
  expect(sb.getByText(content)).toBeDefined()
  expect(sb.getByText(content)).toContainHTML(`<p class="status-bar-field">${content}</p>`)
  expect(sb.container.querySelectorAll('.status-bar-field')).toHaveLength(1)
})

test('status bar should render many items', () => {
  const contentBase = 'status bar item #'
  const n = 9
  const contents = Array.from(Array(n)).map((e, i) => contentBase + i)
  // test for test...
  expect(contents).toHaveLength(n)

  const sb = render(<StatusBar items={contents} />)
  expect(sb.container.querySelectorAll('.status-bar-field')).toHaveLength(n)
  contents.forEach(content =>
    expect(sb.getByText(content))
      .toContainHTML(`<p class="status-bar-field">${content}</p>`)
  )
})
