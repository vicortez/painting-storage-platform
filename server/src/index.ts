import app from './app.ts'
import { PORT } from './config/config.ts'

const port = PORT

const main = async () => {
  app.listen(port, async () => {
    console.log(`Server started on port ${port}`)
  })
}

main()
