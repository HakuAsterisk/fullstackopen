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
    await expect(page.getByText('Login')).toBeVisible()
  })

  describe('Login', () => {
    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'test', 'wrong')
      const errorDiv = page.locator('.notification')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(page.getByText('Test user logged in')).not.toBeVisible()
    })
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'test', 'asd123')
      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
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
        await page
          .getByText('A blog created by playwright', { exact: true })
          .click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('1')).toBeVisible()
      })
      test('A blog can be deleted', async ({ page }) => {
        await page
          .getByText('A blog created by playwright', { exact: true })
          .click()
        page.on('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'Delete' }).click()
        await expect(
          page.getByText('A blog created by playwright', { exact: true }),
        ).not.toBeVisible()
      })

      describe('When 2nd user logs in', () => {
        test('blog cannot be deleted by other user', async ({ page }) => {
          await page.getByRole('button', { name: 'Logout' }).click()
          await login(page, 'other', 'asd1234')
          await page
            .getByText('A blog created by playwright', { exact: true })
            .click()
          await expect(
            page.getByRole('button', { name: 'Delete' }),
          ).not.toBeVisible()
        })
      })
    })
  })
})
