import { useAuth } from '@/context/authContext/authContext'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { getCurrentUser } from '../services/api/userApi'
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

const Login = ({ className }: Props) => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { isAuthenticated } = useAuth()

  useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    const errors = validateInputs()
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error))
      return
    }

    try {
      await login(email, password)
      toast.success('Login realizado com sucesso!')
      navigate('/')
    } catch (error) {
      toast.error('Erro ao realizar login.')
    }
  }

  const validateInputs = (): string[] => {
    const errors = []
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email)) {
      errors.push('Email inválido')
    }
    if (password.trim().length < 3) {
      errors.push('Senha deve ter pelo menos 3 caracteres')
    }
    return errors
  }

  const handleClickSignup = () => {
    navigate('/signup')
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
        <form onSubmit={handleSubmitLogin}>
          <div className="flex flex-col gap-3 justify-center items-center mb-4">
            <div className="mb-0.5 text-sm">Autentique-se</div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="on"
            />
            <input
              type="password"
              placeholder="Senha"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-row justify-between w-full">
              <Button type="button" variant="secondary" onClick={handleClickSignup} size="lg">
                Cadastre-se
              </Button>
              <Button type="submit" size="lg">
                Entrar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
