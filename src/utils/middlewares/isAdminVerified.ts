import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
// Middlewares
import AdminUser from './models/adminUserModel'

export default nc<NextApiRequest, NextApiResponse>().use(
  async (req, res, next) => {
    const { body } = req

    const email = body.email as string
    const password = body.password as string

    if (!email || !password) {
      return res.json({ isVerified: false, message: 'Please Email & Password' })
    }

    const adminUser = await AdminUser.findOne({ email })
    if (!adminUser) {
      return res.json({
        isVerified: false,
        message: 'Not found AdminUser by email',
      })
    }
    if (password !== adminUser.password) {
      return res.json({ isVerified: false, message: 'Not Matched Password' })
    }
    next()
  }
)
