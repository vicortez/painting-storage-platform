import axios from 'axios'

const baseUrl = '/api/users'

export const getCurrentUser = async () => {
  const res = await axios.get(`${baseUrl}/me`)
  return res.data
}

export const signUp = async (name: string, email: string, password: string) => {
  await axios.post(`${baseUrl}/signup`, {
    name,
    email,
    password,
  })
}
