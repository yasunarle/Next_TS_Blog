import axios from 'axios'
// Config
import { API_HOST } from '../../../../config'

type Params = {
  email: string
  password: string
  title: string
  content: string
  category?: string
  tags?: string[]
  publicAt?: Date
}

type IError = {
  error: any | null
}

const postCreate = async (params: Params): Promise<IError> => {
  const data = {
    ...params,
  }

  const res = await axios
    .post(`${API_HOST}/admin/post/create`, data)
    .then((res) => {
      return res.data
    })

  if (res.error) {
    return { error: res.error }
  }
  return { error: null }
}

export default postCreate
