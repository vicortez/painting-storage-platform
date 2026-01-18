import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import albumsRouter from './api/routes/albums.router.ts'
import authRouter from './api/routes/auth.router.ts'
import fakeCdnRouter from './api/routes/fake_cdn.router.ts'
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

app.use('/api/albums', albumsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/fake-cdn-router', fakeCdnRouter)

// app.use(errorHandlerMiddleware)
// // TODO properly configure: /api/* is for not found. others return static
// app.use(notFoundMiddleware)

export default app
