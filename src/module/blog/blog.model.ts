import { Schema, model } from 'mongoose'
import { TBlog, TBlogDescription } from './blog.interface'

const descriptionSchema = new Schema<TBlogDescription>({
  descriptionTiltle: { type: String, required: true },
  blogDetails: { type: String, required: true },
})

const blogSchema = new Schema<TBlog>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: [descriptionSchema], required: true },
  },
  {
    timestamps: true,
  },
)

export const BlogModel = model<TBlog>('Blog', blogSchema)
