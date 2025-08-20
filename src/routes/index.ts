import { Router } from 'express'
import { BannerRoutes } from '../module/banner/banner.routes'

const middlewareRoutes = Router()

const router = [
  {
    path: '/banner',
    routes: BannerRoutes,
  },
]

router.forEach(route => middlewareRoutes.use(route.path, route.routes))

export default middlewareRoutes
