import React, { FC, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getPost } from "../data/api/post"
// Types
import { Post } from "../types/post"

const PostCard: FC = () => {
  const router = useRouter()
  const { id } = router.query
  console.log("--- PostCard")
  // State
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [post, setPost] = useState<Post>(null)
  // Methods
  const initPost = async () => {
    setIsLoading(true)
    const _post = await getPost("hoge")
    if (!_post) {
      return
    }
    setPost(_post)
    setIsLoading(false)
  }
  // Created
  useEffect(() => {
    initPost()
  }, [])

  return (
    <div className="post-card">
      <p>postcard</p>
    </div>
  )
}
export default PostCard
