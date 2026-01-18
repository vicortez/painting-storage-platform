import Loading from '@/components/Loading'
import { useAuth } from '@/context/authContext/authContext'
import { getCurrentUser } from '@/services/api/userApi'
import { useQuery } from '@tanstack/react-query'
import { House } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'
import Button from '../components/Button'

// Instead of fixed header + footer, use flex col with dinamic height content.
// Header and footer = fixed height.
const AppLayout = () => {
  const navigate = useNavigate()
  const { data: user, isFetching: loadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })
  const { logout } = useAuth()

  const handleClickHome = () => {
    navigate('/home')
  }

  const handleClickLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 p-4">
      <div className="shrink-0 mb-4 ">
        <div className="flex flex-col gap-2 mb-1 xs:flex-row xs:justify-between xs:items-center xs:gap-0 ">
          <div
            className="flex flex-row text-lg font-medium justify-center items-center cursor-pointer hover:underline"
            onClick={handleClickHome}
          >
            <span>
              <House className="w-5 h-5 mr-1" />
            </span>
            Meus álbuns de pinturas
          </div>
          {/* For development purposes */}
          {/* <div className="bg-blue-100 xs:bg-blue-500 sm:bg-blue-900">....</div> */}
          {loadingUser && <Loading />}
          {!loadingUser && (
            <div className="flex flex-row gap-1 items-center">
              <div className="">Olá, {user.name.split(' ')[0]}</div>
              <Button variant="secondary" size="sm" className="text-xs" onClick={handleClickLogout}>
                Sair
              </Button>
            </div>
          )}
        </div>
        <hr />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="shrink-0">
        <div className="flex flex-row justify-center gap-2 text-sm text-gray-700">
          Victor Cortez, 2026 <a href="https://github.com/vicortez">github.com/vicortez</a>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
