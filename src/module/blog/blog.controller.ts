/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { blogService } from './blog.service'

const createBlog = async (req: Request, res: Response) => {
  try {
    const blogData = req.body
    const result = await blogService.blogCreate(blogData)
    res.status(200).json({
      success: true,
      message: 'Blog created succesfully',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const result = await blogService.allBlogsGet()
    res.status(200).json({
      success: true,
      message: 'Blogs retrieved successfully! 🎉',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const getBlogsById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await blogService.blogsById(id)
    res.status(200).json({
      success: true,
      message: 'Single Blog retrieved successfully! 🎉',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const blogController = {
  createBlog,
  getAllBlogs,
  getBlogsById,
}
