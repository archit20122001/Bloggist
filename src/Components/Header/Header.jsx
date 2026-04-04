import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const handleNavClick = (slug) => {
    navigate(slug)
    setMenuOpen(false)
  }

  return (
    <header className='py-3 shadow bg-blue-950 relative'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo className='w-30' />
            </Link>
          </div>

          <button
            className='md:hidden text-white focus:outline-none'
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label='Toggle menu'
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <ul className='hidden md:flex ml-auto text-white'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                    onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus &&
              <li>
                <LogoutBtn />
              </li>
            }
          </ul>
        </nav>

        {menuOpen && (
          <ul className='md:hidden flex flex-col mt-3 border-t border-blue-800 pt-3 text-white'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className='w-full text-left px-4 py-3 duration-200 hover:bg-blue-800 rounded-lg'
                    onClick={() => handleNavClick(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus &&
              <li>
                <LogoutBtn />
              </li>
            }
          </ul>
        )}
      </Container>
    </header>
  )
}

export default Header