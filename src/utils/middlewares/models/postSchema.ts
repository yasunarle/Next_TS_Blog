import { Schema, ObjectId } from 'mongoose'
import { Post } from '../../../types/post'

const PostSchema = new Schema({
  title: String,
  content: String,
  category: String,
  tags: Array,
  comments: Array,
  publicAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
})

export default PostSchema
