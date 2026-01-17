import AlbumList from '@/components/AlbumList'
import Button from '@/components/Button'

const HomePage = () => {
  return (
    <>
      <AlbumList className={'mb-4'} />

      <div className="flex justify-end">
        <Button>Criar novo álbum</Button>
      </div>
    </>
  )
}

export default HomePage
