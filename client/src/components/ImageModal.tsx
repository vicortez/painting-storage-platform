import type { PictureDTO } from '@/models/picture.model'
import { Trash, X } from 'lucide-react'

type Props = {
  isOpen: boolean
  picture?: PictureDTO
  onClose: () => void
  onDeletePicture: (pictureId: string) => void
}

const ImageModal = ({ isOpen, picture, onClose, onDeletePicture }: Props) => {
  if (!isOpen || !picture) {
    return null
  }
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-0 xs:p-8">
      <div className="w-full max-h-[90vh] xs:w-dvw max-w-3xl  rounded-sm shadow-xl overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between backdrop-blur-md text-white font-medium p-2">
            <div className="">{picture.title}</div>
            <X className="hover:cursor-pointer" onClick={onClose} />
          </div>
          <img src={picture.pictureUrl} />
        </div>
        <div className="flex flex-col justify-between  backdrop-blur-md text-white p-2">
          <div className="">{picture.description}</div>
          <div className="flex justify-end">
            <Trash
              size={24}
              className="hover:cursor-pointer"
              onClick={() => onDeletePicture(picture!.id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal
