import { NextApiRequest, NextApiResponse } from 'next'
// Middlewares
import app from '../../../../utils/middlewares/app'
import PostModel from '../../../../utils/middlewares/models/postModel'
import isAdminVerified from '../../../../utils/middlewares/isAdminVerified'

interface NextApiRequestExtended extends NextApiRequest {
  query: {
    email: string
    password: string
    title: string
    content: string
    category: string | null
    tags: string | string[] | null
    publicAt: string | null
  }
}

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const {
    body: { title, content, category, tags, publicAt },
  } = req
  console.log('--- api/create')
  console.log(req.body)

  if (!title || !content) {
    return res.json({ error: 'Please Title & Content' })
  }
  // Todo: publicAt をクエリで取得し整形する
  const formateTags = (): string[] => {
    if (typeof tags == 'string') {
      return [tags]
    }
    return tags
  }
  try {
    await PostModel.init()
    const post = new PostModel({
      title,
      content,
      category: category ? category : null,
      tags: tags ? formateTags() : [],
      comments: [],
      publicAt: publicAt ? new Date(publicAt) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await post.save()
    res.json({ error: null })
  } catch (error) {
    res.json({ error })
  }
}

export default app.use(isAdminVerified).post(handler)
