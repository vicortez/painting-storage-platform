import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const getSizeBytes = (fileName: string): number => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const filePath = path.join(__dirname, `../samples/${fileName}`)

  const stats = fs.statSync(filePath)
  return stats.size
}
