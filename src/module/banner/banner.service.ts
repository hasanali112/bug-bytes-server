import { Request } from 'express'
import { Banner } from './banner.model'

const createBanner = async (req: Request) => {
  const file = req.file
  const payload = req.body.data

  const bannerData = {
    imageUrl: file?.path,
    ...payload,
  }

  const result = await Banner.create(bannerData)
  return result
}
