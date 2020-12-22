import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// API
import { getPosts } from '../../data/api/post'
// Types
import { Post } from '../../types/post'
// Contexts
import AdminCtx from '../../contexts/admin'

const AdminHome: FC = () => {
  const router = useRouter()
  const { isAdmin } = AdminCtx.useContainer()
  // State
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [posts, setPosts] = useState<Post[]>([])
  // Methods
  const initPosts = async () => {
    const res = await getPosts()
    console.log(res)

    if (res.error) {
      return
    }
    setPosts(res.posts)
  }

  useEffect(() => {
    setIsLoading(true)
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }
    initPosts()
    setIsLoading(false)
  }, [])

  return (
    <div className="container">
      <div className="container__content">
        <p
          className="pb"
          onClick={() => {
            router.push('/')
          }}
        >
          Blog App へ戻る
        </p>

        <h2 className="pb">アドミンページ</h2>
        {isLoading ? (
          <h3>loading...</h3>
        ) : (
          <div className="pt">
            <button
              onClick={() => {
                router.push('/admin/create')
              }}
            >
              New Post
            </button>
            <div className="pt pb">
              {posts.length ? (
                <div>
                  <h2 className="pt pb">投稿一覧</h2>
                  {posts.map((post) => (
                    <div className="pt pb" key={post._id}>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <a
                        onClick={() => {
                          router.push(`admin/edit/${post._id}`)
                        }}
                      >
                        編集
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p>投稿がありません</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminHome
