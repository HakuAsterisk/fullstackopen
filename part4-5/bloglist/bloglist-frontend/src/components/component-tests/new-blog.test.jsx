import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from '../new-blog'

const newBlog = {
  title: 'Test title',
  author: 'Test author',
  url: 'testurl',
}

describe('<NewBlog />', () => {
  test('Form provides correct details on input', async () => {
    const handler = vi.fn()
    render(<NewBlog handleNewBlog={handler} />)
    const titleInput = screen.getByPlaceholderText('Blog title')
    const authorInput = screen.getByPlaceholderText('Blog author')
    const urlInput = screen.getByPlaceholderText('Blog url')
    const createButton = screen.getByText('Create')

    const event = userEvent.setup()
    await event.type(titleInput, newBlog.title)
    await event.type(authorInput, newBlog.author)
    await event.type(urlInput, newBlog.url)
    await event.click(createButton)

    expect(handler.mock.calls).toHaveLength(1)
    expect(handler.mock.calls[0][0]).toEqual(newBlog)
  })
})
