import type { AlbumDTO, createAlbumDTO } from '@/models/album.model'
import axios from 'axios'

const baseUrl = '/api/albums'

export const createAlbum = async (createAlbumDTO: createAlbumDTO): Promise<AlbumDTO> => {
  const res = await axios.post<AlbumDTO>(`${baseUrl}/`, createAlbumDTO)
  return res.data
}

export const getOwnAlbums = async (): Promise<AlbumDTO[]> => {
  const res = await axios.get<AlbumDTO[]>(`${baseUrl}/own`)
  return res.data
}

export const deleteAlbum = async (id: string): Promise<void> => {
  await axios.delete<void>(`${baseUrl}/${id}`)
}
