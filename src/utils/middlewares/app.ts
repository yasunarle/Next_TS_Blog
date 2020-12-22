import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import dbConnect from './dbConnect'

export default nextConnect<NextApiRequest, NextApiResponse>().use(
  async (_, res, next) => {
    const db = await dbConnect()
    if (!db) {
      res.status(500).json({ error: 'DB Connect Error' })
      return
    }
    next()
  }
)
