import AlbumForm from '@/components/AlbumForm'
import AlbumList from '@/components/AlbumList'
import Button from '@/components/Button'
import FormModal from '@/components/FormModal'
import { useState } from 'react'

const HomePage = () => {
  const [showCreateAlbumModal, setShowCreateAlbumModal] = useState(false)

  const onAlbumSubmitted = () => {
    setShowCreateAlbumModal(false)
  }

  const handleClickCreateAlbum = async () => {
    setShowCreateAlbumModal(true)
  }

  return (
    <>
      <AlbumList className={'mb-4'} />

      <div className="flex justify-end">
        <Button onClick={handleClickCreateAlbum}>Criar novo álbum</Button>
      </div>
      <FormModal
        isOpen={showCreateAlbumModal}
        formId="album-form"
        onCancel={() => setShowCreateAlbumModal(false)}
      >
        <AlbumForm formId="album-form" onSubmitted={onAlbumSubmitted} />
      </FormModal>
    </>
  )
}

export default HomePage
