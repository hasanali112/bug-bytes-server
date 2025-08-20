import { model, Schema } from 'mongoose'
import { IArticle } from './article.interface'

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    type: {
      type: String,
      required: [true, 'Article type is required'],
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
    content: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

export const Article = model<IArticle>('Article', ArticleSchema)
