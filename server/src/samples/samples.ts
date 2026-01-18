import { pic2, pic3 } from './sample_images.ts'

export const albums = [
  {
    id: 1,
    title: 'Paisagens',
    description: 'Álbum de pinturas de paisagens',
    coverImageUrl: undefined,
  },
  {
    id: 2,
    title: 'Retratos',
    description: 'Álbum de pinturas de retratos',
    coverImageUrl: pic3,
  },
  {
    id: 3,
    title: 'Album 3',
    description: 'Álbum de pinturas de gatos',
    coverImageUrl: pic2,
  },
  {
    id: 4,
    title: 'Album 4',
    description: 'Álbum de pinturas abstratas',
    coverImageUrl: pic3,
  },
]

export const pictures = [
  {
    fileName: 'paisagem1-asdfff-ffsafasfs-asdasdsaaffff-asfsaffsafsafbjhbbjbb.jpg',
    sizeBytes: '255000',
    aquisitionDate: '2023-05-15',
    predominantColor: '#FFD700',
    url: pic3,
  },
  {
    fileName: 'paisagem2.jpg',
    sizeBytes: '96',
    aquisitionDate: '2023-05-16',
    predominantColor: '#FFA500',
    url: pic2,
  },
]
