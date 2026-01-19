import type { AlbumDTO } from '@/models/album.model'
import type { PictureDTO } from '@/models/picture.model'
import { deleteAlbum, getOwnAlbums } from '@/services/api/albumApi'
import { deletePicture, getPicturesByAlbum } from '@/services/api/pictureApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Button from './Button'
import FormModal from './FormModal'
import ImageModal from './ImageModal'
import Loading from './Loading'
import PictureForm from './PictureForm'
import PictureMural from './PictureMural'
import PictureTable from './PictureTable'

type Props = {
  id: string
}

const Album = ({ id }: Props) => {
  const [visualizationMode, setVisualizationMode] = useState<'table' | 'mural'>('table')
  const [showAddPictureModal, setShowAddPictureModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedPicture, setSelectedPicture] = useState<PictureDTO | null>(null)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: pictures, isFetching: isFetchingPictures } = useQuery({
    queryKey: ['pictures', { albumId: id }],
    queryFn: () => getPicturesByAlbum(id),
  })
  const { data: albums, isFetching: isFetchingAlbums } = useQuery({
    queryKey: ['albums'],
    queryFn: getOwnAlbums,
  })

  const deleteAlbumMut = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.setQueryData<AlbumDTO[]>(['albums'], (oldData) => {
        const updatedData = oldData || []
        return updatedData.filter((album) => album.id !== id)
      })
      navigate('/')
    },
    onError: (err) => {
      toast.error('Error deleting album.')
    },
  })

  const deletePictureMut = useMutation({
    mutationFn: deletePicture,
    onSuccess: (data, pictureId) => {
      queryClient.setQueryData<PictureDTO[]>(['pictures', { albumId: id }], (oldData) => {
        const data = oldData || []
        return data.filter((picture) => picture.id !== pictureId)
      })
      setShowImageModal(false)
      setSelectedPicture(null)
    },
    onError: (err) => {
      toast.error('Error deleting picture.')
    },
  })

  const handleClickDeletePicture = (pictureId: string) => {
    deletePictureMut.mutate(pictureId)
  }

  const handleClickPicture = (picture: PictureDTO) => {
    setShowImageModal(true)
    setSelectedPicture(picture)
  }

  const handleClickDeleteAlbum = () => {
    deleteAlbumMut.mutate(id)
  }

  const handleClickAddPictures = () => {
    setShowAddPictureModal(true)
  }

  const onPictureSubmitted = async () => {
    setShowAddPictureModal(false)
  }

  if (isFetchingAlbums || isFetchingPictures || !albums) {
    return (
      <div className="flex flex-row justify-center items-center">
        <Loading />
      </div>
    )
  }
  const album = albums.find((album) => album.id === id)

  if (!album) {
    return (
      <div className="flex flex-row justify-center items-center">
        <p>Album not found</p>
      </div>
    )
  }

  return (
    <div className={``}>
      <div className="flex flex-col mb-3">
        <div className="font-medium text-lg">{album.title}</div>
        <div className="flex flex-col xs:flex-row xs:justify-between">
          <div className="text-sm">{album.description}</div>
          <div className="text-xs text-gray-500 mt-2 xs:mt-0 line-through">
            visualizar como: <span>Tabela</span>/<span>Miniaturas</span>
          </div>
        </div>
      </div>
      <div>
        {!pictures ||
          (pictures.length === 0 && (
            <div className="p-4 text-gray-600">Nenhuma foto encontrada.</div>
          ))}
        {pictures && pictures.length > 0 && visualizationMode === 'table' && (
          <div className="flex justify-center">
            <PictureTable pictures={pictures} onClickPicture={handleClickPicture} />
          </div>
        )}
        {pictures && pictures.length > 0 && visualizationMode === 'mural' && (
          <div>
            <PictureMural pictures={pictures} />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between mt-4">
        <Button variant="danger" onClick={handleClickDeleteAlbum}>
          Excluir álbum
        </Button>
        <Button onClick={handleClickAddPictures}>Adicionar fotos</Button>
      </div>
      <FormModal
        isOpen={showAddPictureModal}
        formId="add-picture-form"
        onCancel={() => setShowAddPictureModal(false)}
      >
        <PictureForm formId="add-picture-form" onSubmitted={onPictureSubmitted} albumId={id} />
      </FormModal>
      <ImageModal
        isOpen={showImageModal && !!selectedPicture}
        picture={selectedPicture!}
        onClose={() => setShowImageModal(false)}
        onDeletePicture={handleClickDeletePicture}
      />
    </div>
  )
}

export default Album
