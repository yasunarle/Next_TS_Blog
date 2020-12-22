type Comment = {
  userName: string
  content: string
  createdAt: Date
}

export type Post = {
  _id: string
  title: string
  content: string
  category: Category | null
  tags: string[]
  comments: Comment[]
  createdAt: Date
  publicAt: Date
  updateAt: Date
}

export enum Category {
  MUSIC = 'MUSIC',
  LIFE = 'LIFE',
  SHOPPING = 'SHOPPING',
  YOUTUBE = 'YOUTUBE',
}
