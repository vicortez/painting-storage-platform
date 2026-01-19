import { getSizeBytes } from '#src/lib/file_utils.ts'
import { compareIds } from '#src/lib/security_utils.ts'
import { Album } from '#src/models/album.model.ts'
import type { ErrorResponseDTO } from '#src/models/auth.model.ts'
import { Picture, type CreatePictureDTO, type PictureDTO } from '#src/models/picture.model.ts'
import express, { type RequestHandler } from 'express'

// for reference: RequestHandler<params, response, body, query>
const picturesRouter = express.Router()

const getByAlbum: RequestHandler<
  { albumId: string },
  ErrorResponseDTO | PictureDTO[],
  never,
  never
> = async (req, res) => {
  const { albumId } = req.params
  const user = req.user!
  // does user have permission to read this album?
  const album = await Album.findById(albumId).exec()
  if (!album) {
    res.status(400).json({ error: 'Tried to access pictures in nonexistant album' })
    return
  }
  if (user.id !== album.user.toHexString()) {
    res.status(401).json({ error: 'User is not authorized to see pictures in this album' })
    return
  }

  const pictures = await Picture.find({ album: albumId }).exec()
  res.json(pictures)
}
const create: RequestHandler<
  never,
  ErrorResponseDTO | PictureDTO,
  CreatePictureDTO,
  never
> = async (req, res) => {
  const { title, description, aquisitionDate, pictureUrl, predominantColor, albumId } = req.body
  const user = req.user!

  // does user have permission to post to this album?
  const album = await Album.findById(albumId).exec()
  if (!album) {
    res.status(400).json({ error: 'Tried to post to nonexistant album' })
    return
  }
  if (user.id !== album.user.toHexString()) {
    res.status(401).json({ error: 'User is not authorized to post to this album' })
    return
  }

  if (!title || title.trim().length === 0) {
    res.status(400).json({ error: 'Title is required' })
    return
  }
  if (predominantColor && !predominantColor.startsWith('#')) {
    res
      .status(400)
      .json({ error: 'Predominant color needs to be a hex color code that starts with #' })
    return
  }
  const randomNumber = Math.floor(Math.random() * 8) + 1
  const originalFileName = `${randomNumber}.png`
  // because the user never actually uploads a file, we have to read from our mock file.
  const sizeBytes = getSizeBytes(originalFileName)

  let picture = new Picture({
    title,
    description,
    aquisitionDate,
    pictureUrl: `/api/fake-cdn/images/${originalFileName}`,
    predominantColor,
    originalFileName,
    sizeBytes,
    user: user.id,
    album: albumId,
  })
  picture = await picture.save()
  album.coverImageUrl = picture.pictureUrl
  await album.save()

  res.status(201).json(picture)
}

const deleteById: RequestHandler<{ id: string }, ErrorResponseDTO | void, never, never> = async (
  req,
  res,
) => {
  const id = req.params.id
  const user = req.user!

  const picture = await Picture.findById(id)
  if (picture) {
    if (!compareIds(user.id, picture.user)) {
      res.status(401).json({ error: 'user does not have permission for that action' })
      return
    }
    await picture.deleteOne()
  }

  res.status(204).end()
}

picturesRouter.get('/by-album/:albumId', getByAlbum)
picturesRouter.post('/', create)
picturesRouter.delete('/:id', deleteById)

export default picturesRouter
