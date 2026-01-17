import { IS_AUTHENTICATED_KEY } from '@/utils/constants'
import axios from 'axios'

const baseUrl = '/api/auth'

export const login = async (email: string, password: string) => {
  await axios.post(`${baseUrl}/login`, { email, password })
  localStorage.setItem(IS_AUTHENTICATED_KEY, 'true')
}
export const logout = async () => {
  localStorage.setItem(IS_AUTHENTICATED_KEY, 'false')
}

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(IS_AUTHENTICATED_KEY) === 'true'
}
