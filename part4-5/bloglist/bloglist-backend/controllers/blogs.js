const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { identifyUser } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    _id: 1,
  })
  res.json(blogs)
})

blogsRouter.post('/', identifyUser, async (req, res) => {
  const body = req.body
  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'Title or url missing' })
  }

  const user = req.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(
    await savedBlog.populate('user', {
      username: 1,
      _id: 1,
    }),
  )
})

blogsRouter.delete('/:id', identifyUser, async (req, res) => {
  const user = req.user
  const targetBlog = await Blog.findById(req.params.id)
  if (!targetBlog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  if (targetBlog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'You may only delete your own blogs' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  let targetBlog = await Blog.findById(req.params.id)
  if (!targetBlog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  targetBlog.title = body.title
  targetBlog.author = body.author
  targetBlog.url = body.url
  targetBlog.likes = body.likes
  const updatedBlog = await targetBlog.save()
  res.json(
    await updatedBlog.populate('user', {
      username: 1,
      _id: 1,
    }),
  )
})

module.exports = blogsRouter
