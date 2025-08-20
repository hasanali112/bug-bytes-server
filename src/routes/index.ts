import { Router } from 'express'
import { ArticleRoutes } from '../module/atricle/article.routes'

const middlewareRoutes = Router()

const router = [
  {
    path: '/article',
    routes: ArticleRoutes,
  },
]

router.forEach(route => middlewareRoutes.use(route.path, route.routes))

export default middlewareRoutes
