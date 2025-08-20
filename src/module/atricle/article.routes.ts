import { Router } from 'express'
import { updloadSingleImage } from '../../config/cloudinary/multer.config'
import { ArticleController } from './article.controller'

const router = Router()

router.get('/', ArticleController.getAllArticles)

router.get('/:id', ArticleController.getSingleArticle)

router.post(
  '/create-article',
  updloadSingleImage('article-image'),
  ArticleController.createArticle,
)

export const ArticleRoutes = router
