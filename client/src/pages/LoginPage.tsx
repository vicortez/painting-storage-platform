import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import { useLocation } from 'react-router'

const LoginPage = () => {
  const location = useLocation()

  const isLogin = location.pathname === '/login'

  return (
    <div className="h-full flex items-center justify-center">
      {isLogin && <Login className="w-full xs:max-w-md" />}
      {!isLogin && <SignUp className="w-full xs:max-w-md" />}
    </div>
  )
}

export default LoginPage
