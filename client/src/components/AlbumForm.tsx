import type { AlbumDTO } from '@/models/album.model'
import { createAlbum } from '@/services/api/albumApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  formId?: string
  onSubmitted?: () => void
}

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

const AlbumForm = ({ formId, onSubmitted }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const queryClient = useQueryClient()

  const createAlbumMut = useMutation({
    mutationFn: createAlbum,
    onSuccess: (createdAlbum) => {
      queryClient.setQueryData<AlbumDTO[]>(['albums'], (oldData) => {
        const updatedData = oldData || []
        return updatedData.concat(createdAlbum)
      })
      if (onSubmitted) {
        onSubmitted()
      }
    },
    onError: (err) => {
      toast.error('Error creating album.')
    },
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const errors = validate()
    if (errors.length > 0) {
      errors.forEach((errorTxt) => toast.error(errorTxt))
      return
    }
    createAlbumMut.mutate({ title, description })
  }

  const validate = (): string[] => {
    const errors = []
    if (title.trim().length === 0) {
      errors.push('O título é obrigatório.')
    }

    return errors
  }

  return (
    <div className="">
      <h1 className="mb-5 text-lg font-medium">Criar novo álbum</h1>
      <form onSubmit={handleSubmit} id={formId}>
        <div className="flex flex-col gap-3">
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
        </div>
      </form>
    </div>
  )
}

export default AlbumForm
