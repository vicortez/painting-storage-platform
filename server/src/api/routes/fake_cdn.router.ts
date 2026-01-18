import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.join(__dirname, 'src', 'samples')

const fakeCdnRouter = express.Router()

fakeCdnRouter.get('/images/:fileName', (req, res) => {
  const fileName = req.params.fileName
  const fullPath = path.join(IMAGES_DIR, fileName)

  if (!fullPath.startsWith(IMAGES_DIR)) {
    return res.status(403).send('Access denied')
  }

  if (fs.existsSync(fullPath)) {
    res.sendFile(fullPath)
  } else {
    res.status(404).send('Image not found')
  }
})

export default fakeCdnRouter
