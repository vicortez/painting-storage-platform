import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3004

export const JWT_SIGNING_SECRET = process.env.JWT_SIGNING_SECRET!
if (!JWT_SIGNING_SECRET) {
  throw new Error('JWT_SIGNING_SECRET env var not set! Aborting server launch')
}

export const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI env var not set! Aborting server launch')
}

export const AUTH_TOKEN_EXPIRATION_TIME_SECS = 60 * 60 * 24
