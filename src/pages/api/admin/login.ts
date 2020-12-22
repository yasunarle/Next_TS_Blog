import { NextApiRequest, NextApiResponse } from 'next'
// Middlewares
import app from '../../../utils/middlewares/app'
import isAdminVerified from '../../../utils/middlewares/isAdminVerified'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ isVerified: true, message: null })
}

export default app.use(isAdminVerified).post(handler)
