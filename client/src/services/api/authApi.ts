import client from '@/lib/client'
import { IS_AUTHENTICATED_KEY } from '@/models/constants'

const baseUrl = '/api/auth'

export const login = async ({ email, password }: { email: string; password: string }) => {
  await client.post(`${baseUrl}/login`, { email, password })
  localStorage.setItem(IS_AUTHENTICATED_KEY, 'true')
}

export const logout = async () => {
  localStorage.setItem(IS_AUTHENTICATED_KEY, 'false')
}

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(IS_AUTHENTICATED_KEY) === 'true'
}
