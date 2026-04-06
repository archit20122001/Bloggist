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
    <div className='min-h-screen flex flex-col content-between bg-[#5d6a7f] bg-linear-to-b from-[#5d6a7f] via-[#939eb1] via-49% to-[#b6c7e4]'>
      <Header />
      <main className='flex grow'>
        <Outlet />
      </main>
      <Footer />

    </div>
  ) : null
}

export default App