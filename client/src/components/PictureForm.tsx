import { validateDateStr } from '@/lib/validators'
import type { AlbumDTO } from '@/models/album.model'
import type { PictureDTO } from '@/models/picture.model'
import { createAlbum } from '@/services/api/albumApi'
import { createPicture } from '@/services/api/pictureApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageCompression, { type Options } from 'browser-image-compression'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

export const MAX_ORIGINAL_IMG_SIZE_MB = 10

const inputClasses = `
w-full 
bg-white 
placeholder-gray-400
border border-gray-300 
rounded-xs
px-3 py-2
outline-none 
transition-all
focus:border-emerald-500 
focus:ring-2
focus:ring-emerald-500/10
`

type Props = {
  formId?: string
  albumId: string
  onSubmitted?: () => void
}

const PictureForm = ({ formId, albumId, onSubmitted }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [aquisitionDate, setAquisitionDate] = useState<string | undefined>(undefined)
  const [predominantColor, setPredominantColor] = useState<string | undefined>('')
  const queryClient = useQueryClient()
  const pictureInputRef = useRef<HTMLInputElement>(null)

  const createPictureMut = useMutation({
    mutationFn: createPicture,
    onSuccess: (createdPicture) => {
      queryClient.setQueryData<PictureDTO[]>(['pictures', { albumId }], (oldData) => {
        const updatedData = oldData || []
        return updatedData.concat(createdPicture)
      })
      if (onSubmitted) {
        onSubmitted()
      }
    },
    onError: (err) => {
      toast.error('Error creating picture.')
    },
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const errors = validate()
    if (errors.length > 0) {
      errors.forEach((errorTxt) => toast.error(errorTxt))
      return
    }
    createPictureMut.mutate({
      title,
      description,
      aquisitionDate: new Date(aquisitionDate!),
      predominantColor,
      // due to time constraints, we are using a random pre-selected image in the backend.
      pictureUrl: '',
      albumId,
    })
  }

  const validate = (): string[] => {
    const errors = []
    if (title.trim().length === 0) {
      errors.push('O título é obrigatório.')
    }
    if (predominantColor && !predominantColor.startsWith('#')) {
      errors.push("Cor predominante precisa usar o padrão hexadecimal de cor e começar com '#'")
    }
    if (!aquisitionDate) {
      errors.push('A data de aquisição é obrigatória')
    } else {
      errors.push(...validateDateStr(aquisitionDate))
    }

    return errors
  }

  return (
    <div>
      <h1 className="mb-5 text-lg font-medium">Criar novo álbum</h1>
      <form onSubmit={handleSubmit} id={formId}>
        <div className="flex flex-col gap-3">
          <label htmlFor="file">
            <span className="text-sm">
              obs: input não utilizado. Imagem será uma foto aleatória
            </span>
            <input
              type="file"
              name="file"
              ref={pictureInputRef}
              className={inputClasses}
              accept="image/*"
            />
          </label>

          <input
            type="text"
            name="title"
            placeholder="Título*"
            className={inputClasses}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            placeholder="Descrição"
            className={inputClasses}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            name="aquisitionDate"
            className={inputClasses}
            value={aquisitionDate}
            onChange={(ev) => setAquisitionDate(ev.target.value)}
          />
          <input
            type="text"
            name="predominantColor"
            placeholder="Cor predominante"
            className={inputClasses}
            value={predominantColor}
            onChange={(e) => setPredominantColor(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}

export default PictureForm
