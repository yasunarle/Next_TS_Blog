import { Schema, ObjectId } from 'mongoose'

const AdminUserSchema = new Schema({
  email: String,
  password: String,
})

export default AdminUserSchema
