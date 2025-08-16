import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './module/user/user.routes'
import { blogRoute } from './module/blog/blog.routes'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', userRoutes)
app.use('/api/v1', blogRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio server is running',
  })
})

export default app
