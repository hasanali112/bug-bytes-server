import { model, Schema } from 'mongoose'
import { IBanner } from './banner.interface'

const BannerSchema = new Schema<IBanner>(
  {
    title: {
      type: String,
      required: [true, 'Banner title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['GAMING', 'TECH', 'REVIEWS', 'NEWS', 'GUIDES'],
        message: '{VALUE} is not a valid category',
      },
    },
    publishDate: {
      type: Date,
      required: [true, 'Publish date is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      validate: {
        validator: function (v: string) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v)
        },
        message: (props: any) => `${props.value} is not a valid URL!`,
      },
    },
    excerpt: {
      type: String,
      maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    content: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

export const Banner = model<IBanner>('Banner', BannerSchema)
