import { IS_AUTHENTICATED_KEY } from '@/models/constants'
import type { ApiErrorResponse } from '@/models/errors.model'
import axios, { AxiosError, type AxiosResponse } from 'axios'

const client = axios.create()

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (!error.response) {
      return Promise.reject(error)
    }
    const { status, data } = error.response
    if (isMissingTokenError(status, data)) {
      // would be a good idea to add an observer in the auth provider to let it know what happened.
      // this would make the redirection redundant
      localStorage.setItem(IS_AUTHENTICATED_KEY, 'false')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
function isMissingTokenError(status: number, data: ApiErrorResponse): boolean {
  return status === 401 && data?.error === 'missing_token'
}

export default client
