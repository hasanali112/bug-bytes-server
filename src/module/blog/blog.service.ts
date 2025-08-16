import { TBlog } from './blog.interface'
import { BlogModel } from './blog.model'

const blogCreate = async (blog: TBlog) => {
  const result = await BlogModel.create(blog)
  return result
}

const allBlogsGet = async () => {
  const result = await BlogModel.find()
  return result
}
const blogsById = async (id: string) => {
  const result = await BlogModel.findById({ _id: id })
  return result
}

export const blogService = {
  blogCreate,
  allBlogsGet,
  blogsById,
}
