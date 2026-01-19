import { isAuthenticated, login, logout } from '@/services/api/authApi'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './authContext'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [_isAuthenticated, setIsAuthenticated] = useState(() => isAuthenticated())

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = isAuthenticated()
      setIsAuthenticated(authStatus)
    }
    checkAuth()
  }, [])

  const _login = async (email: string, password: string) => {
    await login({ email, password })
    setIsAuthenticated(true)
  }
  const _logout = async () => {
    await logout()
    setIsAuthenticated(false)
  }

  const registerLogin = () => {
    setIsAuthenticated(true)
  }

  const authContextValue = useMemo(
    () => ({ isAuthenticated: _isAuthenticated, login: _login, logout: _logout, registerLogin }),
    [_isAuthenticated],
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
