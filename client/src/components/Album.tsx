import { albums, pictures } from '@/samples/samples'
import { useState } from 'react'
import Button from './Button'
import PictureMural from './PictureMural'
import PictureTable from './PictureTable'

type Props = {
  id: string
}

const Album = ({ id }: Props) => {
  const [visualizationMode, setVisualizationMode] = useState<'table' | 'mural'>('table')
  const handleClickPicture = (pictureId: number) => {
    console.log('Clicked picture with id:', pictureId)
  }

  const handleClickDeleteAlbum = () => {
    console.log('Delete album with id:', id)
  }
  const handleClickAddPictures = () => {
    console.log('Add pictures to album with id:', id)
  }

  return (
    <div className={``}>
      <div className="flex flex-col mb-3">
        <div className="font-medium text-lg">{albums[1].title}</div>
        <div className="flex flex-col xs:flex-row xs:justify-between">
          <div className="text-sm">{albums[1].description}</div>
          <div className="text-xs text-gray-500 mt-2 xs:mt-0 line-through">
            visualizar como: <span>Tabela</span>/<span>Miniaturas</span>
          </div>
        </div>
      </div>
      <div>
        {visualizationMode === 'table' && (
          <div className="flex justify-center">
            <PictureTable pictures={pictures} onClickPicture={handleClickPicture} />
          </div>
        )}
        {visualizationMode === 'mural' && (
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
    </div>
  )
}

export default Album
