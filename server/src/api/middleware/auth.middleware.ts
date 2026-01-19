import { JWT_SIGNING_SECRET } from '#src/config/config.ts'
import { AUTH_TOKEN_COOKIE_KEY } from '#src/models/constants.ts'
import { UnauthorizedError } from '#src/models/errors.model.ts'
import type { UserDTO } from '#src/models/user.model.ts'
import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware: RequestHandler = async (req, res, next): Promise<void> => {
  const token = req.cookies?.[AUTH_TOKEN_COOKIE_KEY] as string | undefined
  if (!token) {
    throw new UnauthorizedError('missing_token')
  }

  const decodedTokenData = jwt.verify(token, JWT_SIGNING_SECRET) as UserDTO
  req.user = decodedTokenData
  next()
}

export default authMiddleware
