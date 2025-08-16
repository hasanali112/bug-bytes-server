/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { userService } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await userService.userCreate(userData)
    res.status(200).json({
      success: true,
      message: 'User created succesfully',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.userGet()
    res.status(200).json({
      success: true,
      message: 'Skill retrieved successfully! 🎉',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const userController = {
  createUser,
  getUser,
}
