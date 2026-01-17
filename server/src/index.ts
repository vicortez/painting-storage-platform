import mongoose from 'mongoose'
import app from './app.ts'
import { MONGODB_URI, PORT } from './config/config.ts'

const port = PORT

mongoose.set('strictQuery', true)
const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log('error connecting to MongoDB:', err.message))

const main = async () => {
  app.listen(port, async () => {
    console.log(`Server started on port ${port}`)
  })
}

main()
