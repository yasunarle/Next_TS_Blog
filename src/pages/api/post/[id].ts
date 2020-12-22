import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongoose'
// Middlewares
import app from '../../../utils/middlewares/app'
import PostModel from '../../../utils/middlewares/models/postModel'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req
  console.log('--- api/post')

  console.log(req.query)

  if (!id) {
    res.json({ error: 'Not Get ID', post: null })
  }

  try {
    const post = await PostModel.findOne({ _id: id })
    console.log('--- post ok:', post)

    res.json({ post, error: null })
  } catch (error) {
    res.json({ error, post: null })
  }
}

export default app.get(handler)
