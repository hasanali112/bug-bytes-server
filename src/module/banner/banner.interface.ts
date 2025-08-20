export interface IBanner {
  title: string
  category: string
  publishDate: Date
  imageUrl: string
  excerpt?: string
  content?: string
  tags?: string[]
  isFeatured: boolean
  slug: string
  createdAt: Date
  updatedAt: Date
}
