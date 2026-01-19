import type { ErrorResponseDTO } from '#src/models/auth.model.ts'
import { User, type CreateUserDTO, type UserDTO } from '#src/models/user.model.ts'
import bcrypt from 'bcrypt'
import express, { type RequestHandler } from 'express'
import authMiddleware from '../middleware/auth.middleware.ts'

// for reference: RequestHandler<params, response, body, query>
const userRouter = express.Router()

const saltRounds = 10

const getMe: RequestHandler<never, UserDTO, never, never> = async (req, res) => {
  const { id } = req.user!
  const user = await User.findById(id).exec()
  if (!user) {
    res.status(404).end()
    return
  }
  res.json(user)
}

const createUser: RequestHandler<never, ErrorResponseDTO | UserDTO, CreateUserDTO, never> = async (
  req,
  res,
) => {
  const { email, password, name } = req.body

  if (!password || password.length < 3) {
    res.status(400).json({ error: 'password should be at least 3 characters long' })
    return
  }

  const existingUserCount = await User.countDocuments().exec()
  if (existingUserCount >= 10) {
    res.status(400).json({ error: 'user limit reached, cannot create more users' })
    return
  }

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ email, name, passwordHash })

  await user.save()
  res.status(201).end()
}

userRouter.get('/me', authMiddleware, getMe)
userRouter.post('/signup', createUser)

export default userRouter
