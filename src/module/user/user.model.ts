import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'vendor', 'superAdmin'],
      Required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      required: true,
      default: 'ACTIVE',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)
export const User = model<IUser>('user', userSchema)
