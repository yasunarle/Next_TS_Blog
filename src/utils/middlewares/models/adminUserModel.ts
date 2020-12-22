import mongoose from 'mongoose'
import AdminUserSchema from './adminUserSchema'

type AdminUser = {
  email: string
  password: string
}

interface AdminUserDocument extends AdminUser, mongoose.Document {
  _id: string
  error: Error
}
const { models } = mongoose

const AdminUserModel = models.AdminUser
  ? mongoose.model<AdminUserDocument>('AdminUser')
  : mongoose.model<AdminUserDocument>('AdminUser', AdminUserSchema)
export default AdminUserModel
