import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../blog'

const blog = {
  user: [{ id: '123' }],
  title: 'Test title',
  author: 'Test author',
  url: 'testurl',
  likes: 7,
}
const user = [
  {
    id: '123',
  },
]

describe('<Blog />', () => {
  beforeEach(() => {
    render(<Blog blog={blog} user={user} />)
  })

  test('Only title and author visible on render', () => {
    const title = screen.getByText('Test title')
    expect(title).toBeDefined().toBeVisible()
    const author = screen.getByText('Test author')
    expect(author).toBeDefined().toBeVisible()

    const url = screen.getByText('testurl')
    expect(url).not.toBeVisible()
    const likes = screen.getByText('7')
    expect(likes).not.toBeVisible()
  })

  test('Everything visible when button is clicked', async () => {
    const event = userEvent.setup()
    const button = screen.getByText('View')
    await event.click(button)

    const title = screen.getByText('Test title')
    expect(title).toBeDefined().toBeVisible()
    const author = screen.getByText('Test author')
    expect(author).toBeDefined().toBeVisible()

    const url = screen.getByText('testurl')
    expect(url).toBeVisible()
    const likes = screen.getByText('7')
    expect(likes).toBeVisible()
  })
})

describe('Likes', () => {
  test('Like button handles calls properly', async () => {
    const handler = vi.fn()
    render(<Blog blog={blog} user={user} handleLike={handler} />)
    const event = userEvent.setup()
    const button = screen.getByText('View')
    await event.click(button)

    const likeButton = screen.getByText('Like')
    await event.click(likeButton)
    await event.click(likeButton)

    expect(handler.mock.calls).toHaveLength(2)
  })
})
