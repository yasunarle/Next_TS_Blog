import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
// API
import { logInWithEmailAndPassword } from '../data/api/admin/login'

type AdminUser = {
  email: string
  password: string
} | null

interface State {
  isAdmin: boolean
  adminUser: AdminUser
}

const initState = {
  isAdmin: false,
  adminUser: null,
}

function useAdmin(state: State = initState) {
  const [isAdmin, setIsAdmin] = useState<Boolean>(state.isAdmin)
  const [adminUser, setAdminUser] = useState<AdminUser>(state.adminUser)

  const logIn = async (
    email: string,
    password: string
  ): Promise<{ isLoggedIn: boolean }> => {
    const res = await logInWithEmailAndPassword({ email, password })
    if (!res.isVerified) {
      return { isLoggedIn: false }
    }

    setIsAdmin(true)
    setAdminUser({ email, password })
    return { isLoggedIn: true }
  }
  return {
    isAdmin,
    adminUser,
    logIn,
  }
}

const AdminCtx = createContainer(useAdmin)
export default AdminCtx
