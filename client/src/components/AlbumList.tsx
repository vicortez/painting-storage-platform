import { getOwnAlbums } from '@/services/api/albumApi'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import Loading from './Loading'

type Props = {
  className?: string
}

const AlbumList = ({ className }: Props) => {
  const navigate = useNavigate()

  const {
    data: albums,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['albums'],
    queryFn: getOwnAlbums,
  })

  const handleClickAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`)
  }

  if (isFetching) {
    return (
      <div className="flex flex-row justify-center items-center">
        <Loading />
      </div>
    )
  }

  if (!albums || albums.length === 0) {
    return <div>Nenhum album. Crie seu primeiro album!</div>
  }
  return (
    <div
      className={`
        ${className}
        grid grid-cols-1 justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4
      `}
    >
      {albums.map((album) => (
        <div
          key={album.id}
          className="flex justify-center hover:cursor-pointer"
          onClick={() => handleClickAlbum(album.id)}
        >
          <div className="mb-4 w-full xs:w-60">
            {album.coverImageUrl && (
              <img
                src={album.coverImageUrl}
                alt={album.title}
                className="w-full h-48 xs:h-32 border border-solid rounded-sm object-cover"
              />
            )}
            {!album.coverImageUrl && (
              <div className="bg-gray-200 w-full h-48 xs:h-32 border border-solid rounded-sm object-cover" />
            )}
            <div className="mt-2">
              <h3 className="font-medium">{album.title}</h3>
              <p className="text-sm text-gray-500">{album.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AlbumList
