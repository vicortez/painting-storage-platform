import client from '@/lib/client'
import type { AlbumDTO, createAlbumDTO } from '@/models/album.model'

const baseUrl = '/api/albums'

export const createAlbum = async (createAlbumDTO: createAlbumDTO): Promise<AlbumDTO> => {
  const res = await client.post<AlbumDTO>(`${baseUrl}/`, createAlbumDTO)
  return res.data
}

export const getOwnAlbums = async (): Promise<AlbumDTO[]> => {
  const res = await client.get<AlbumDTO[]>(`${baseUrl}/own`)
  return res.data
}

export const deleteAlbum = async (id: string): Promise<void> => {
  await client.delete<void>(`${baseUrl}/${id}`)
}
