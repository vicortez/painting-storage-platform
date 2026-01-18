import { isObjectIdOrHexString, model, Schema, Types } from 'mongoose'

export interface IAlbumDocument {
  id: string
  title: string
  description: string
  coverImageUrl?: string
  user: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const albumSchema = new Schema<IAlbumDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverImageUrl: { type: String, required: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

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

export interface createAlbumDTO {
  title: string
  description?: string
}
export interface AlbumDTO {
  id: string
  title: string
  description?: string
  coverImageUrl?: string
}
