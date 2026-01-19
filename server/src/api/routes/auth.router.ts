import { JWT_SIGNING_SECRET } from '#src/config/config.ts'
import type { ErrorResponseDTO, LoginRequestBody } from '#src/models/auth.model.ts'
import { AUTH_TOKEN_COOKIE_KEY } from '#src/models/constants.ts'
import { User, type UserDTO } from '#src/models/user.model.ts'
import bcrypt from 'bcrypt'
import express, { type RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

// for reference: RequestHandler<params, response, body, query>
const authRouter = express.Router()

const login: RequestHandler<never, ErrorResponseDTO | void, LoginRequestBody, never> = async (
  req,
  res,
) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    res.status(400).json({ error: 'Invalid email or password' })
    return
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatches) {
    res.status(400).json({ error: 'Invalid email or password' })
    return
  }

  const payload: UserDTO = {
    id: user.id,
    email: user.email,
    name: user.name,
  }

  const expirySeconds = 7 * 24 * 60 * 60 // 7 days
  const token = jwt.sign(payload, JWT_SIGNING_SECRET, {
    expiresIn: expirySeconds,
  })

  res.cookie(AUTH_TOKEN_COOKIE_KEY, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  })

  res.end()
}

authRouter.post('/login', login)

export default authRouter
