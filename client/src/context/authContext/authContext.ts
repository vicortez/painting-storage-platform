import { createContext, useContext } from 'react'

export interface IAuthContext {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  registerLogin: () => void
  logout: () => void
}

export const AuthContext = createContext<IAuthContext | null>(null)
AuthContext.displayName = 'AuthContext'

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Must be used within AuthProvider')
  }
  return context
}
