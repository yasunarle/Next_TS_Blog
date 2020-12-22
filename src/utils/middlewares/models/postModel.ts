import mongoose, { PaginateModel, Document } from 'mongoose'
import pagination from 'mongoose-paginate-v2'
import PostSchema from './postSchema'

interface IPost extends Document {
  title: string
  content: string
  category: string | null
  tags: string[]
  comments: []
  publicAt: Date
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

interface PostPaginateModel<T extends Document> extends PaginateModel<T> {}

// interface IPostPaginateModel<T extends mongoose.Document>
//   extends PaginateModel<T> {}

const { models } = mongoose

PostSchema.plugin(pagination)

const PostModel: PostPaginateModel<IPost> = models.Post
  ? (mongoose.model<IPost>('Post') as PostPaginateModel<IPost>)
  : (mongoose.model<IPost>('Post', PostSchema) as PostPaginateModel<IPost>)
export default PostModel
