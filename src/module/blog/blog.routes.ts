import express from 'express'
import { blogController } from './blog.controller'

const route = express.Router()

route.post('/blog/create-blog', blogController.createBlog)
route.get('/blogs', blogController.getAllBlogs)
route.get('/blogs/:id', blogController.getBlogsById)

export const blogRoute = route
