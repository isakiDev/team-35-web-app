import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'

import { useAuth } from '../../hooks/useAuth'

import { ErrorMessage } from '../../components/ErrorMessage'

import type { LoginInput } from '../../interfaces/auth.interface'
import { type LoginFormValues, invoiceSchema } from './login.schema'

export const Login = () => {
  const { onLogin } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(invoiceSchema) })

  const navigate = useNavigate()

  const onSubmit = async (data: LoginInput) => {
    toast.promise(
      onLogin(data).then(async () => {
        await navigate({ to: '/' })
      }),
      {
        loading: <b>Iniciando sesión...</b>,
        success: <b>Bienvenid@ ✨️</b>,
        error: (err) => <b>{err.message}</b>,
      }
    )
  }

  const errorMessages = Object.values(errors).map(({ message }) => message)

  return (
    <section className='flex flex-1 items-center justify-center bg-slate-200'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(onSubmit)()
        }}
        className='w-full max-w-[22rem] h-fit bg-slate-100 rounded-xl flex flex-col items-center p-8 border border-slate-200 shadow'
      >
        <header className='text-center mb-6'>
          <h1 className='font-bold text-2xl'>Bienvenido a Financia</h1>
          <p className='text-xs text-slate-600'>
            Ingresa a tu cuenta para continuar.
          </p>
        </header>

        <input
          {...register('email')}
          required
          className='text-sm font-normal outline w-full rounded-t-sm bg-slate-200 outline-slate-300 p-2'
          type='email'
          placeholder='Correo electrónico'
        />
        <input
          maxLength={20}
          {...register('password')}
          required
          className='text-sm font-normal outline w-full rounded-b-sm bg-slate-200 outline-slate-300 p-2'
          type='password'
          placeholder='Contraseña'
        />

        {errorMessages.map((message, index) => (
          <ErrorMessage
            key={index}
            message={message}
          />
        ))}

        <footer className='flex flex-col justify-center mt-4 w-full gap-4'>
          <a
            href='#'
            className='text-xs self-end text-[#1183d4] hover:text-[#0e6fb4]'
          >
            ¿Olvidaste tu contraseña?
          </a>

          <button
            className='bg-[#1183d4] hover:bg-[#0e6fb4] hover:cursor-pointer rounded-md py-1 text-white font-semibold'
            type='submit'
          >
            Iniciar Sesión
          </button>

          <span className='text-xs text-center'>
            ¿No tienes una cuenta?{' '}
            <Link
              to='/auth/register'
              className='text-[#1183d4] hover:text-[#0e6fb4] hover:cursor-pointer'
            >
              Regístrate
            </Link>
          </span>
        </footer>
      </form>
    </section>
  )
}
