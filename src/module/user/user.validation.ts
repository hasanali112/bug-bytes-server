import { z } from 'zod'

const userValidationSchema = z.object({
  userName: z
    .string()
    .min(1, 'Username is required')
    .max(8, 'Username cannot exceed 8 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  isAdmin: z.boolean(),
})

export default userValidationSchema
