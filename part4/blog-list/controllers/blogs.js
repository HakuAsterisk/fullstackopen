const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const targetBlog = await Blog.findById(req.params.id)
  if (!targetBlog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  targetBlog.title = body.title
  targetBlog.author = body.author
  targetBlog.url = body.url
  targetBlog.likes = body.likes
  const updatedBlog = await targetBlog.save()
  res.json(updatedBlog)
})

module.exports = blogsRouter
