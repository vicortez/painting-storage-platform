import { signUp } from '@/services/api/userApi'
import { validateEmail, validateName, validatePassword } from '@/utils/validators'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Button from './Button'

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
  className?: string
}

const SignUp = ({ className }: Props) => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitSignUp = async (event: React.FormEvent) => {
    event.preventDefault()
    const errors = validateInputs()
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error))
      return
    }

    try {
      await signUp(name, email, password)
      toast.success('Cadastro realizado com sucesso!')
      navigate('/')
    } catch (error) {
      toast.error('Erro ao realizar cadastro.')
    }
  }

  const validateInputs = (): string[] => {
    const errors = []
    errors.push(...validateName(name))
    errors.push(...validateEmail(email))
    errors.push(...validatePassword(password))

    return errors
  }

  const handleClickCancel = () => {
    navigate('/login')
  }

  return (
    <div
      className={`${className} border border-solid! border-black! bg-green-tis-light rounded-sm
       shadow-md flex flex-col items-center`}
    >
      <div className="flex items-center justify-center bg-green-tis-dark text-white xs:py-3 px-6 w-full">
        <h1 className="font-medium text-xl p-4">Meus álbums de pinturas</h1>
      </div>
      <div className="w-full p-6">
        <form onSubmit={handleSubmitSignUp}>
          <div className="flex flex-col gap-3 justify-center items-center mb-4">
            <div className="mb-0.5 text-sm">Faça seu cadastro:</div>
            <input
              type="text"
              placeholder="Nome"
              className={inputClasses}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-row justify-between w-full">
              <Button type="button" variant="secondary" onClick={handleClickCancel} size="lg">
                Cancelar
              </Button>
              <Button type="submit" size="lg">
                Concluir
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
