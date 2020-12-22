import { NextApiRequest, NextApiResponse } from 'next'
// Middlewares
import app from '../../../utils/middlewares/app'
import PostModel from '../../../utils/middlewares/models/postModel'

interface NextApiRequestExtended extends NextApiRequest {
  query: {
    page: string | null
    category: string | null
    tag: string | null
  }
}
const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  console.log('--- /api/posts')

  const {
    query: { category, tag, page },
  } = req

  if (category && tag) {
    res.json({ error: 'Either Category or Tag ', posts: null })
  }

  const defaultPage = 1
  const pageNumber = page ? Number(page) : defaultPage

  try {
    // Note: Category
    if (category) {
      const { docs } = await PostModel.paginate(
        { deletedAt: { $exists: false }, category },
        { page: pageNumber, limit: 5 }
      )
      res.json({ posts: docs, error: null })
      return
    }
    if (tag) {
      const { docs } = await PostModel.paginate(
        { tags: { $in: [tag] } },
        { page: pageNumber, limit: 5 }
      )
      res.json({ posts: docs, error: null })
      return
    }
    // Note: Tag
    // Note: 指定なし
    const { docs } = await PostModel.paginate(
      { deletedAt: { $exists: false } },
      { page: pageNumber, limit: 5 }
    )
    res.json({ posts: docs, error: null })
  } catch (error) {
    console.log(error)

    res.json({ error })
  }
}

export default app.get(handler)
