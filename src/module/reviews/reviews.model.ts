import { model, Schema } from 'mongoose'
import { TReviews } from './reviews.interface'

const reviewSchema = new Schema<TReviews>({
  rating: { type: Number, required: true },
  feedback: { type: String, required: true },
})

export const Reviews = model<TReviews>('Reviews', reviewSchema)
