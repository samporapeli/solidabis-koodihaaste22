import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import Window from './Window';

test('renders correctly without input', () => {
  const w = render(<Window />)
  const windowContainer = w.container.querySelector('.window')
  expect(windowContainer).toBeDefined()
  expect(w.container.querySelector('.window-body')).toBeDefined()
  expect(w.container.querySelector('.title-bar')).toBeDefined()
})

test('title bar has title and 3 buttons', () => {
  const title = 'This is a test title for test purposes'
  const w = render(<Window title={title} />)
  const titleBar = w.container.querySelector('.title-bar')
  expect(titleBar.querySelectorAll('button')).toHaveLength(3)
  expect(titleBar.querySelector('.title-bar-text')).toContainHTML(title)
})

test('clicking minimize toggles visibility', async () => {
  const user = userEvent.setup()
  const w = render(<Window><p>This is body content</p></Window>)
  const body = w.container.querySelector('.window-body')
  expect(body).toBeVisible()
  // window body is visible, now click minimize
  const minimize = w.container.querySelector('[aria-label="Minimize"]')
  await user.click(minimize)
  expect(body).not.toBeVisible()
  await user.click(minimize)
  expect(body).toBeVisible()
})

test('clicking maximize shows "minimized" body', async () => {
  const user = userEvent.setup()
  const w = render(<Window><p>This is body content</p></Window>)
  const body = w.container.querySelector('.window-body')
  const minimize = w.container.querySelector('[aria-label="Minimize"]')
  const maximize = w.container.querySelector('[aria-label="Maximize"]')
  await user.click(minimize)
  expect(body).not.toBeVisible()
  await user.click(maximize)
  expect(body).toBeVisible()
})

test('clicking close triggers the close handler', async () => {
  const user = userEvent.setup()
  const mockCloseFn = jest.fn()
  expect(mockCloseFn.mock.calls).toHaveLength(0)
  const w = render(<Window closeHandler={mockCloseFn} />)
  const close = w.container.querySelector('[aria-label="Close"]')
  await user.click(close)
  expect(mockCloseFn.mock.calls).toHaveLength(1)
  const n = 12
  for (let i = 0; i < n; i++)
    await user.click(close)
  expect(mockCloseFn.mock.calls).toHaveLength(1 + n)
})
