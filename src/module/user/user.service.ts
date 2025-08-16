import { TUser } from './user.interface'
import { UserModel } from './user.model'

const userCreate = async (user: TUser) => {
  const result = await UserModel.create(user)
  return result
}

const userGet = async () => {
  const result = await UserModel.find()
  return result
}

export const userService = {
  userCreate,
  userGet,
}
