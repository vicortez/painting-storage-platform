import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'

const a = ''

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" />
      </Routes>
    </>
  )
}

export default App
