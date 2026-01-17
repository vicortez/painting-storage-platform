import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import './App.css'
import AuthProvider from './context/authContext/authProvider'
import AppLayout from './layout/AppLayout'
import PrivateRoute from './layout/PrivateRoute'
import AlbumPage from './pages/AlbumPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

// This is here to test static code the analysis tool ESLint
const a = ''

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              {/* private routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/album/:id" element={<AlbumPage />} />
            </Route>
          </Route>

          {/* public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="*" element={<div className="text-center">Page does not exist!</div>} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
