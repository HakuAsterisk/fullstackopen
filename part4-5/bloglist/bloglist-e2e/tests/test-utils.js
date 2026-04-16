const login = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'New blog' }).click()
  await page.getByRole('textbox', { name: 'Title' }).fill(content.title)
  await page.getByRole('textbox', { name: 'Author' }).fill(content.author)
  await page.getByRole('textbox', { name: 'Url' }).fill(content.url)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(content.title, { exact: true }).waitFor()
}

export { login, createBlog }
