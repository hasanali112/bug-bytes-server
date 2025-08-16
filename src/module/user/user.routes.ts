import express from 'express'
import { userController } from './user.controller'

const route = express.Router()

route.post('/user/create-user', userController.createUser)
route.get('/user', userController.getUser)

export const userRoutes = route
