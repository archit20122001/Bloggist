import React from 'react'
import { useDispatch } from 'react-redux'
// import { AuthService } from '../../Appwrite/configuration'
import authService from '../../Appwrite/auth'
import { logout } from '../../Store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            className='inline-bock px-6 py-2 text-white duration-200 hover:bg-blue-100 hover:text-black rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn