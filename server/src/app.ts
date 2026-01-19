import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import authMiddleware from './api/middleware/auth.middleware.ts'
import errorHandlerMiddleware from './api/middleware/error_handler.middleware.ts'
import albumsRouter from './api/routes/albums.router.ts'
import authRouter from './api/routes/auth.router.ts'
import picturesRouter from './api/routes/pictures.router.ts'
import userRouter from './api/routes/user.router.ts'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))
const anyNonAPIRoute = /^\/(?!api($|\/)).*$/
app.get(anyNonAPIRoute, (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

// we are using a fake cdn to emulate a service like cloudinary or AWS.
app.use(
  '/api/fake-cdn/images',
  authMiddleware,
  express.static(path.join(__dirname, './samples'), {
    extensions: ['png', 'jpg', 'jpeg'], // Only serve these extensions
    index: false, // Disable directory indexing (looking for index.html)
    redirect: false, // Disable redirecting /dir to /dir/
  }),
)

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/albums', authMiddleware, albumsRouter)
app.use('/api/pictures', authMiddleware, picturesRouter)

app.use(errorHandlerMiddleware)

export default app
