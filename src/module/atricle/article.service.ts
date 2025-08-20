import { Request } from 'express'
import { Article } from './article.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createArticle = async (req: Request) => {
  const file = req.file
  const payload = JSON.parse(req.body.data)

  const articleData = {
    title: payload.title,
    category: payload.category,
    type: payload.type,
    imageUrl: file?.path,
    content: payload.content,
  }

  const result = await Article.create(articleData)
  return result
}

const getAllArticles = async (query: Record<string, unknown>) => {
  const searchQuery = await new QueryBuilder(Article.find(), query)
    .search(['title', 'content'])
    .filter()
    .fields()
    .sort().modelQuery

  const countotal = await new QueryBuilder(Article.find(), query).countTotal()

  return {
    searchQuery,
    countotal,
  }
}

const getSingleArticle = async (id: string) => {
  const article = await Article.findById(id)
  return article
}

export const ArticleService = {
  createArticle,
  getAllArticles,
  getSingleArticle,
}
