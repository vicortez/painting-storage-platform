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
  aquisitionDate: Date
  predominantColor?: string
  pictureUrl: string
  originalFileName: string
  sizeBytes: number
}
