const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog-test-helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithManyBlogs)
})

describe('Blog tests', () => {
  describe('Reading blogs', () => {
    test('Expected amount of blogs returned as JSON', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, helper.listWithManyBlogs.length)
    })

    test('Blog identifier is "id", not "_id"', async () => {
      const response = await api.get('/api/blogs')
      response.body.forEach((blog) => {
        assert.ok(blog.id)
      })
    })

    test('Likes always defined and >= 0', async () => {
      const blogWithoutLikes = helper.newBlog
      delete blogWithoutLikes.likes

      const savedBlog = await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(savedBlog.body.likes, 0)
    })
  })

  describe('Adding blogs', () => {
    test('A valid blog can be added', async () => {
      const savedBlog = await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithManyBlogs.length + 1)
      const titles = blogsAtEnd.map((b) => b.title)
      assert.ok(titles.includes(savedBlog.body.title))
    })

    test('Blog with invalid data fails with 400', async () => {
      const blogWithoutTitle = helper.newBlog
      delete blogWithoutTitle.title
      await api.post('/api/blogs').send(blogWithoutTitle).expect(400)

      const blogWithoutUrl = helper.newBlog
      delete blogWithoutUrl.url
      await api.post('/api/blogs').send(blogWithoutUrl).expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithManyBlogs.length)
    })
  })
  describe('Deleting blogs', () => {
    test('Specific blog can be deleted with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithManyBlogs.length - 1)
      const titles = blogsAtEnd.map((b) => b.title)
      assert.ok(!titles.includes(blogToDelete.title))
    })
  })
  describe('Updating blogs', () => {
    test('Blog can be updated with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedBlogData = {
        likes: blogToUpdate.likes + 1,
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
