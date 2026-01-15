import express, { type RequestHandler } from 'express'

// for reference: RequestHandler<params, response, body, query>
const imagesRouter = express.Router()

const getByAlbum: RequestHandler<never, [], never, never> = async (req, res) => {
  res.send([])
}

imagesRouter.get('/by-album/:id', getByAlbum)

export default imagesRouter
