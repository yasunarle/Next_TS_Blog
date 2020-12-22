import axios from 'axios'
// Config
import { API_HOST } from '../../config'
// Types
import { Post } from '../../types/post'

export async function getPost(id: string): Promise<{ post: Post; error: any }> {
  console.log(`${API_HOST}/post/${id}`)

  const res = await axios.get(`${API_HOST}/post/${id}`).then((_res) => {
    return _res.data
  })
  return res
}

export async function getPosts(
  page?: number,
  tag?: string,
  category?: string
): Promise<{ posts: Post[]; error: any }> {
  console.log('--- getPosts')

  const res = await axios
    .get(`${API_HOST}/posts`, { params: {} })
    .then((res) => {
      return res.data
    })
  return res
}
