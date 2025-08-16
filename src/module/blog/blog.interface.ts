export type TBlogDescription = {
  descriptionTiltle: string
  blogDetails: string
}

export type TBlog = {
  image: string
  title: string
  category: string
  status: string
  description: [TBlogDescription]
}
