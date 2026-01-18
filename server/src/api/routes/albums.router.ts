import { Album, type AlbumDTO, type createAlbumDTO } from '#src/models/album.model.ts'
import type { ErrorResponseDTO } from '#src/models/auth.model.ts'
import { User, type IUserDocument } from '#src/models/user.model.ts'
import { compareIds } from '#src/utils/security_utils.ts'
import express, { type RequestHandler } from 'express'

// for reference: RequestHandler<params, response, body, query>
// for reference: RequestHandler<never, never, never, never>
const albumsRouter = express.Router()

const getOwn: RequestHandler<never, AlbumDTO[], never, never> = async (req, res) => {
  // TODO hardcoded for now. Will come from req.user
  const user = {
    _id: '696aed0733aac1d08ccbfbcb',
  }
  const userId = user._id
  const albums = await Album.find({ user: userId }).exec()

  res.send(albums)
}

const getById: RequestHandler<never, null, never, never> = async (req, res) => {
  console.log('TODO')
  res.send(null)
}

const create: RequestHandler<never, ErrorResponseDTO | AlbumDTO, createAlbumDTO, never> = async (
  req,
  res,
) => {
  const { title, description } = req.body
  // TODO req.user
  const user: IUserDocument = (await User.findById('696aed0733aac1d08ccbfbcb')) as IUserDocument

  if (!title || title.trim().length === 0) {
    res.status(400).json({ error: 'Title is required' })
    return
  }

  let album = new Album({ title, description, user: user.id })
  album = await album.save()

  res.status(201).json(album)
}

const deleteById: RequestHandler<{ id: string }, ErrorResponseDTO | void, never, never> = async (
  req,
  res,
) => {
  const id = req.params.id
  // TODO from req!
  const user = {
    _id: '696aed0733aac1d08ccbfbcb',
  }

  const album = await Album.findById(id)
  if (album) {
    if (!compareIds(user._id, album.user)) {
      res.status(401).json({ error: 'user does not have permission for that action' })
      return
    }
    await album.deleteOne()
  }

  res.status(204).end()
}

albumsRouter.get('/own', getOwn)
albumsRouter.get('/:id', getById)
albumsRouter.post('/', create)
albumsRouter.delete('/:id', deleteById)

export default albumsRouter
