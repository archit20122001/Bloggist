import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import authService from './Appwrite/auth'
import { login, logout } from './Store/authSlice'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col content-between bg-[#adabf7] bg-linear-to-t from-[#adabf7] via-[#bae7ff] via-49% to-[#c4ffd2]'>
      <Header />
      <main className='flex grow flex-col px-8'>
        <Outlet />
      </main>
      <Footer />

    </div>
  ) : null
}

export default App