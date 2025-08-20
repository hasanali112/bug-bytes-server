import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler'
import { notFoundRoutes } from './middleware/notFoundRoutes'
import middlewareRoutes from './routes'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://techghor.vercel.app'],
    credentials: true,
  }),
)

app.use('/api/v1', middlewareRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'TechGhor server is running',
  })
})

app.use(globalErrorHandler)
app.use(notFoundRoutes)

export default app
