import React, { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
// API
import { getPost } from '../../../data/api/post'

const PostEditPage: FC = () => {
  const router = useRouter()
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postId, setPostId] = useState('')
  const [post, setPost] = useState(null)
  // Methods
  const initPost = async (id: string) => {
    const res = await getPost(id)
    if (res.error) {
      return
    }
    setPost(res.post)
  }
  // Created
  useEffect(() => {
    if (router.asPath !== router.route) {
      const _id = router.query.id as string
      setPostId(_id)
    }
  }, [router])
  useEffect(() => {
    if (!postId) {
      return
    }
    initPost(postId)
  }, [postId])

  return (
    <div className="container">
      <div className="container__content">
        <a
          onClick={() => {
            router.push('/admin')
          }}
        >
          Go Back Admin Home
        </a>
        <h3 className="pt">PostEdit</h3>
        {post ? (
          <div>
            <h3>{post.title}</h3>
            <h4>{post.content}</h4>
          </div>
        ) : (
          <p>404: 該当する投稿はありません。</p>
        )}
      </div>
    </div>
  )
}
export default PostEditPage
