import axios from 'axios'
// Config
import { API_HOST } from '../../../config'
// Types
type Params = {
  email: string
  password: string
}

export const logInWithEmailAndPassword = async ({
  email,
  password,
}: Params) => {
  const res = await axios
    .post(`${API_HOST}/admin/login`, {
      email,
      password,
    })
    .then((res) => {
      return res.data
    })
  console.log(res)

  if (res.isVerified) {
    return { isVerified: true, error: null }
  }
  return { isVerified: false, error: res.error }
}
