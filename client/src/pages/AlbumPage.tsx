import Album from '@/components/Album'
import { useParams } from 'react-router'

const AlbumPage = () => {
  const params = useParams()
  const id = params.id as string

  if (!id) {
    return <div>Album not found</div>
  }

  return (
    <>
      <Album id={id} />
    </>
  )
}

export default AlbumPage
