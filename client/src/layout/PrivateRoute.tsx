import { useAuth } from '@/context/authContext/authContext'
import { Navigate, Outlet } from 'react-router'

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  } else {
    return <Outlet />
  }
}

export default PrivateRoute
