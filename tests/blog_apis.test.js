const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


// describe('the blog list application returns the correct amount of blog posts in the JSON format.', () => {


const testBlogs= [
  {
    title: '10 Tips for Better Time Management',
    author: 'John Doe',
    url: 'https://example.com/10-tips-for-better-time-management',
    likes: 500
  },
  {
    title: 'The Benefits of Meditation',
    author: 'Jane Smith',
    url: 'https://example.com/the-benefits-of-meditation',
    likes: 1000
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testBlogs[0])
  await blogObject.save()
  blogObject = new Blog(testBlogs[1])
  await blogObject.save()
})


test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})