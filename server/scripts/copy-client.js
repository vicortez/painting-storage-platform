import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, '../../client/dist')
const publicPath = path.join(__dirname, '../public')

console.log('Copying static files to public folder')

if (fs.existsSync(publicPath)) {
  fs.rmSync(publicPath, { recursive: true, force: true })
}

fs.cpSync(distPath, publicPath, { recursive: true })
