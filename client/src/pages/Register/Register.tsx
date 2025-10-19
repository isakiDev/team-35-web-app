import { useForm } from 'react-hook-form'

import { Link, useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { type RegisterFormValues, invoiceSchema } from './register.schema'
import { ErrorMessage } from '../../components/ErrorMessage'
import { useAuth } from '../../hooks/useAuth'

import toast from 'react-hot-toast'

export const Register = () => {
  const { onRegister } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(invoiceSchema) })

  const navigate = useNavigate()

  const onSubmit = async (data: RegisterFormValues) => {
    toast.promise(
      onRegister(data).then(async () => {
        await navigate({ to: '/' })
      }),
      {
        loading: <b>Cargando...</b>,
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
          <h1 className='font-bold text-2xl'>Crea tu cuenta en Financia</h1>
          <p className='text-xs text-slate-600'>
            Regístrate y comienza a gestionar tu crédito de manera rápida y
            segura.
          </p>
        </header>

        <input
          {...register('name')}
          required
          className='text-sm font-normal outline w-full rounded-t-sm bg-slate-200 outline-slate-300 p-2'
          type='text'
          placeholder='Nombre Completo'
        />

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
          className='text-sm font-normal outline w-full bg-slate-200 outline-slate-300 p-2'
          type='password'
          placeholder='Contraseña'
        />

        <input
          {...register('confirmPassword')}
          required
          className='text-sm font-normal outline w-full rounded-b-sm bg-slate-200 outline-slate-300 p-2'
          type='password'
          placeholder='Confirmar contraseña'
        />

        {errorMessages.map((message, index) => (
          <ErrorMessage
            key={index}
            message={message}
          />
        ))}

        <footer className='flex flex-col justify-center mt-4 w-full gap-4'>
          <button
            className='bg-[#1183d4] hover:bg-[#0e6fb4] hover:cursor-pointer rounded-md py-1 text-white font-semibold'
            type='submit'
          >
            Registrarse
          </button>

          <span className='text-xs text-center'>
            ¿Ya tienes una cuenta?{' '}
            <Link
              to='/auth/login'
              className='text-[#1183d4] hover:text-[#0e6fb4] hover:cursor-pointer'
            >
              Inicia sesión
            </Link>
          </span>
        </footer>
      </form>
    </section>
  )
}
