import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, handleLogout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    handleLogout()
    navigate({ to: '/' })
  }

  const menuRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6 md:px-10'>
        <Link
          to='/'
          className='flex items-center space-x-2'
        >
          <div className='w-6 h-6 bg-blue-600 rounded-sm'></div>
          <span className='font-semibold text-gray-800 text-2xl'>Financia</span>
        </Link>

        <button
          ref={buttonRef}
          className='lg:hidden text-gray-700 focus:outline-none transition-transform'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Abrir menú'
        >
          {menuOpen ? (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>

        <div
          className={`
            flex flex-col lg:flex-row items-center font-medium text-gray-700
            absolute lg:static top-full right-0 w-full lg:w-auto bg-slate-100/80 lg:bg-transparent backdrop-blur-md border-t border-gray-200 lg:border-none shadow-md lg:shadow-none
            overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'}
          `}
        >
          <ul
            ref={menuRef}
            className='flex flex-col lg:flex-row items-center w-full lg:w-auto'
          >
            {[
              { to: '/', label: 'Inicio' },
              { to: '/services', label: 'Servicios' },
              { to: '/about-us', label: 'Conócenos' },
              { to: '/contact', label: 'Contacto' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className='block px-4 py-2 hover:text-blue-600 transition-colors'
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className='flex flex-col lg:flex-row lg:items-center w-fit gap-2 p-4 lg:p-0'>
            {!isAuthenticated && (
              <Link
                to='/auth/login'
                className='px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition text-center'
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}

            <Link
              to={isAuthenticated ? '/solicitar' : '/auth/register'}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center'
              onClick={() => setMenuOpen(false)}
            >
              {isAuthenticated ? 'Solicitar crédito' : 'Registrarse'}
            </Link>

            {isAuthenticated && (
              <button
                className='px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition text-center'
                onClick={onLogout}
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
