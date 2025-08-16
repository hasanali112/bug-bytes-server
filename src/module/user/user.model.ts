import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    min: [6, 'Password must be at least 6 characters long'],
  },
  isAdmin: { type: Boolean },
})

export const UserModel = model<TUser>('user', userSchema)
