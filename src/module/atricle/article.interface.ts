export interface IArticle {
  title: string
  category: string
  type: string
  imageUrl: string
  content?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}
