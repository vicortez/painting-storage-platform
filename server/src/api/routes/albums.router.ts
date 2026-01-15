import express, { type RequestHandler } from 'express'

// for reference: RequestHandler<params, response, body, query>
const albumsRouter = express.Router()

const getOwn: RequestHandler<never, [], never, never> = async (req, res) => {
  res.send([])
}
const getAll: RequestHandler<never, [], never, never> = async (req, res) => {
  console.log('TODO only admin can see all albums')
  res.send([])
}
const getById: RequestHandler<never, null, never, never> = async (req, res) => {
  console.log('TODO only admin can see all albums')
  res.send(null)
}

albumsRouter.get('/own', getOwn)
albumsRouter.get('/:id', getById)
albumsRouter.get('/', getAll)

export default albumsRouter
