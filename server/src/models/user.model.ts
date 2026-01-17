import { isObjectIdOrHexString, model, Schema } from 'mongoose'

export interface IUserDocument {
  id: string
  email: string
  passwordHash: string
  name: string
}

const userSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    const { _id, __v, passwordHash, ...properties } = returnedObj
    if (isObjectIdOrHexString(returnedObj._id)) {
      properties.id = returnedObj._id.toString()
    }
    return properties
  },
})

export const User = model('User', userSchema)

export interface CreateUserDTO {
  email: string
  password: string
  name: string
}
export interface UserDTO {
  email: string
  name: string
  id: string
}
