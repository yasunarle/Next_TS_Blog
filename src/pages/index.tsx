import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// API
import { getPosts } from '../data/api/post'
// Types
import { Post } from '../types/post'
import AdminCtx from '../contexts/admin'

const Home: FC = () => {
  const { isAdmin } = AdminCtx.useContainer()
  const router = useRouter()
  // State
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [posts, setPosts] = useState<Post[]>([])
  // Methods
  const initPosts = async () => {
    const res = await getPosts()
    if (!res.posts) {
      return
    }
    setPosts(res.posts)
  }
  useEffect(() => {
    initPosts()
  }, [])
  return (
    <div className="container">
      <div className="container__content">
        <h1>Blog App</h1>
        <div>
          <h2>投稿一覧</h2>
          {posts.map((post) => (
            <div key={post._id}>
              <a
                onClick={() => {
                  router.push(`/post/${post._id}`)
                }}
              >
                {post.title}
              </a>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home
