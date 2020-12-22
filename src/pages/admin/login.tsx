import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'

// Context
import AdminCtx from '../../contexts/admin'

const AdminLogin: FC = () => {
  const router = useRouter()
  const { logIn } = AdminCtx.useContainer()
  // State
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // Methods
  const isFormFull = (): Boolean => {
    if (email && password) {
      return true
    }
    return false
  }
  const handleLogIn = async () => {
    if (isFormFull()) {
      const { isLoggedIn } = await logIn(email, password)
      if (isLoggedIn) {
        router.push('/admin')
        return
      }
      alert('認証に失敗しました。')
      return
    }
    alert('入力フォームを埋めてください')
  }
  return (
    <div className="container">
      <div className="container__content">
        <h2>AdminLogin</h2>
        <div>
          <label>Email:</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <button onClick={handleLogIn}>Login</button>
      </div>
    </div>
  )
}
export default AdminLogin
