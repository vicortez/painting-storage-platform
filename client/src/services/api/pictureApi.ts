import client from '@/lib/client'
import type { CreatePictureDTO, PictureDTO } from '@/models/picture.model'

const baseUrl = '/api/pictures'

export const createPicture = async (createPictureDTO: CreatePictureDTO): Promise<PictureDTO> => {
  const res = await client.post<PictureDTO>(`${baseUrl}/`, createPictureDTO)
  return res.data
}

export const getPicturesByAlbum = async (albumId: string): Promise<PictureDTO[]> => {
  const res = await client.get<PictureDTO[]>(`${baseUrl}/by-album/${albumId}`)
  return res.data
}

export const deletePicture = async (id: string): Promise<void> => {
  await client.delete<void>(`${baseUrl}/${id}`)
}
