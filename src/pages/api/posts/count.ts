import { NextApiRequest, NextApiResponse } from 'next'
// Middlewares
import app from '../../../utils/middlewares/app'
import PostModel from '../../../utils/middlewares/models/postModel'

interface NextApiRequestExtended extends NextApiRequest {
  query: {
    category: string | null
    tag: string | null
  }
}
const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const {
    query: { category, tag },
  } = req

  if (category && tag) {
    res.json({ error: 'Either Category or Tag ', count: 0 })
  }

  try {
    if (category) {
      const count = await PostModel.find({
        deletedAt: { $exists: false },
        category,
      }).countDocuments({})
      res.json({ error: null, count })
    }
    if (tag) {
      const count = await PostModel.find({
        deletedAt: { $exists: false },
        tags: { $in: [tag] },
      }).countDocuments({})
      res.json({ error: null, count })
    }
    const count = await PostModel.find({
      deletedAt: { $exists: true },
    }).countDocuments({})
    res.json({ error: null, count })
  } catch (error) {
    res.json({ error })
  }
}

export default app.get(handler)
