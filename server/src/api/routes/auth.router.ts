import { JWT_SIGNING_SECRET } from '#src/config/config.ts'
import type { ErrorResponseDTO, LoginRequestBody } from '#src/models/auth.model.ts'
import { User } from '#src/models/user.model.ts'
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

  const payload = {
    sub: user._id,
    email: user.email,
  }

  const expirySeconds = 7 * 24 * 60 * 60
  const token = jwt.sign(payload, JWT_SIGNING_SECRET, {
    expiresIn: expirySeconds,
  })

  res.end()
}

authRouter.post('/login', login)

export default authRouter
