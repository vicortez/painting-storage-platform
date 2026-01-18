import Button from '@/components/Button'
import React from 'react'

type Props = {
  isOpen: boolean
  children: React.ReactNode
  formId?: string
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

const FormModal = ({
  isOpen,
  children,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  formId,
}: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 xs:p-8">
      <div className="w-full max-h-[90vh] xs:w-dvw max-w-3xl bg-white rounded-sm shadow-xl overflow-hidden p-5">
        {children}
        <div className="flex justify-between gap-2 p-4 border-t">
          <Button onClick={onCancel} variant="secondary">
            {cancelText}
          </Button>
          <Button type={formId != null ? 'submit' : 'button'} form={formId}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FormModal
