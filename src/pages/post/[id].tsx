import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
// API
import { getPost } from '../../data/api/post'

const PostPage = () => {
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
        <h2>PostPage</h2>
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
export default PostPage
