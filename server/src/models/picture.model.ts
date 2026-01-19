import { isObjectIdOrHexString, model, Schema, Types } from 'mongoose'

export interface IPictureDocument {
  id: string
  title: string
  description: string
  pictureUrl?: string
  aquisitionDate: Date
  predominantColor: string
  originalFileName: string
  sizeBytes: number
  user: Types.ObjectId
  album: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const pictureSchema = new Schema<IPictureDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    pictureUrl: { type: String, required: true },
    aquisitionDate: { type: Date, required: true },
    predominantColor: { type: String, required: false },
    originalFileName: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: 'Album',
    },
  },
  {
    timestamps: true,
  },
)

pictureSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    const { _id, __v, ...properties } = returnedObj
    if (isObjectIdOrHexString(returnedObj._id)) {
      properties.id = returnedObj._id.toString()
    }
    return properties
  },
})

export const Picture = model('Picture', pictureSchema)

export interface CreatePictureDTO {
  title: string
  description?: string
  aquisitionDate?: Date
  predominantColor?: string
  pictureUrl?: string
  albumId: string
}

export interface PictureDTO {
  id: string
  title: string
  description?: string
  coverImageUrl?: string
}
