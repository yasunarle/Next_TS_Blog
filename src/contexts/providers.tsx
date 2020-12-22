import type { ReactNode } from 'react'
import AdminCtx from './admin'

interface Props {
  children: ReactNode
}

const Providers = ({ children }: Props) => (
  <AdminCtx.Provider>{children}</AdminCtx.Provider>
)

export default Providers
