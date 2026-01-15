import express from 'express'
import albumsRouter from './api/routes/albums.router.ts'

const app = express()

app.use('/api/albums', albumsRouter)

export default app
