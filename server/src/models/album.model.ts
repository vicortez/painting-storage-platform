import { isObjectIdOrHexString, model, Schema } from 'mongoose'

export interface IAlbumDocument {
  id: string
  title: string
  description: string
  coverImageUrl?: string
}

const albumSchema = new Schema<IAlbumDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImageUrl: { type: String, required: false },
})

albumSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    const { _id, __v, ...properties } = returnedObj
    if (isObjectIdOrHexString(returnedObj._id)) {
      properties.id = returnedObj._id.toString()
    }
    return properties
  },
})

export const Album = model('Album', albumSchema)
