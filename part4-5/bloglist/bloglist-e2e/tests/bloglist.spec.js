const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./test-utils')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test user',
        username: 'test',
        password: 'asd123',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Other user',
        username: 'other',
        password: 'asd1234',
      },
    })

    await page.goto('/')
  })
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Blogs')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'test', 'asd123')
      await expect(page.getByText('Test user logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'test', 'wrong')
      const errorDiv = page.locator('.notification')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Test user logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await login(page, 'test', 'asd123')
        await createBlog(page, {
          title: 'A blog created by playwright',
          author: 'Playwright',
          url: 'http://playwright.dev',
        })
      })
      test('A blog can be created', async ({ page }) => {
        await expect(
          page.getByText('A blog created by playwright', { exact: true }),
        ).toBeVisible()
      })
      test('A blog can be liked', async ({ page }) => {
        const blog = page.getByText('A blog created by playwright', {
          exact: true,
        })
        const blogElement = blog.locator('../..')
        await blogElement.getByRole('button', { name: 'View' }).click()
        await blogElement.getByRole('button', { name: 'Like' }).click()
        await expect(blogElement.getByText('1')).toBeVisible()
      })
      test('A blog can be deleted', async ({ page }) => {
        const blog = page.getByText('A blog created by playwright', {
          exact: true,
        })
        const blogElement = blog.locator('../..')
        await blogElement.getByRole('button', { name: 'View' }).click()
        page.on('dialog', (dialog) => dialog.accept())
        await blogElement.getByRole('button', { name: 'Delete Blog' }).click()
        await expect(blog).not.toBeVisible()
      })

      describe('When 2nd user logs in', () => {
        test('blog cannot be deleted by other user', async ({ page }) => {
          await page.getByRole('button', { name: 'Logout' }).click()
          await login(page, 'other', 'asd1234')
          const blog = page.getByText('A blog created by playwright', {
            exact: true,
          })
          const blogElement = blog.locator('../..')
          await blogElement.getByRole('button', { name: 'View' }).click()
          await expect(
            blogElement.getByRole('button', { name: 'Delete Blog' }),
          ).not.toBeVisible()
        })
      })

      describe('When multiple blogs exist', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, {
            title: 'Another Playwright blog',
            author: 'Playwright',
            url: 'http://playwright.dev',
          })
        })
        test('blogs are ordered according to likes', async ({ page }) => {
          const secondBlog = page.getByText('Another Playwright blog', {
            exact: true,
          })
          const secondElement = secondBlog.locator('../..')
          await secondElement.getByRole('button', { name: 'View' }).click()
          await secondElement.getByRole('button', { name: 'Like' }).click()
          const blogElements = page.locator('.blogList').locator('div')
          await expect(blogElements.first()).toContainText(
            'Another Playwright blog',
          )
          await expect(blogElements.nth(3)).toContainText(
            'A blog created by playwright',
          )
        })
      })
    })
  })
})
