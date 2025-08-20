import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ArticleService } from './article.service'

const createArticle = catchAsync(async (req, res) => {
  const result = await ArticleService.createArticle(req)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Article created successfully',
    data: result,
  })
})

const getAllArticles = catchAsync(async (req, res) => {
  const result = await ArticleService.getAllArticles(req.query)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Articles retrieved successfully',
    meta: result.countotal,
    data: result.searchQuery,
  })
})

const getSingleArticle = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ArticleService.getSingleArticle(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Article retrieved successfully',
    data: result,
  })
})

export const ArticleController = {
  createArticle,
  getAllArticles,
  getSingleArticle,
}
