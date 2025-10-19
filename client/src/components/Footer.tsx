import { Link } from '@tanstack/react-router'

function Footer() {
  return (
    <footer className='bg-gray-100 py-6 text-sm text-gray-600 flex flex-col items-center space-y-2'>
      <div className='w-full flex justify-center gap-5 sm:gap-10 px-3 text-center'>
        <Link
          to='/policies'
          className='hover:text-blue-600 w-fit'
        >
          Política de Privacidad
        </Link>
        <Link
          to='/contact'
          className='hover:text-blue-600  w-fit'
        >
          Contacto
        </Link>
        <Link
          to='/terms'
          className='hover:text-blue-600  w-fit'
        >
          Términos y Condiciones
        </Link>
      </div>
      <p>© 2025 Financia. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
