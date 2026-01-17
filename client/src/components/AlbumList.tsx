import { albums } from '@/../../dev_assets/samples/samples'
import { useNavigate } from 'react-router'

type Props = {
  className?: string
}

const AlbumList = ({ className }: Props) => {
  const navigate = useNavigate()
  const handleClickAlbum = (albumId: number) => {
    navigate(`/album/${albumId}`)
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
            {album.thumbnailUrl && (
              <img
                src={album.thumbnailUrl}
                alt={album.title}
                className="w-full h-48 xs:h-32 border border-solid rounded-sm object-cover"
              />
            )}
            {!album.thumbnailUrl && (
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
