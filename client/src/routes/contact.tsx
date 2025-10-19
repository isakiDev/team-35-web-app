import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <section className='px-6 py-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold text-center mb-4'>Contáctanos</h1>
      <p className='text-slate-600 text-center mb-5'>
        ¿Tienes dudas o deseas conocer más sobre nuestros servicios? Completa el
        siguiente formulario o escríbenos directamente.
      </p>

      <form className='bg-slate-100 shadow rounded-xl p-6 flex flex-col gap-4 border border-slate-200'>
        <input
          type='text'
          placeholder='Nombre completo'
          className='p-2 rounded-md border bg-slate-200 outline-slate-300 border-slate-300 focus:outline-[#1183d4]'
        />
        <input
          type='email'
          placeholder='Correo electrónico'
          className='p-2 rounded-md border bg-slate-200 outline-slate-300 border-slate-300 focus:outline-[#1183d4]'
        />
        <textarea
          placeholder='Escribe tu mensaje'
          rows={5}
          className='p-2 rounded-md border bg-slate-200 outline-slate-300 border-slate-300 focus:outline-[#1183d4]'
        ></textarea>

        <button
          type='submit'
          className='bg-[#1183d4] hover:bg-[#0e6fb4] text-white rounded-md py-2 font-semibold'
        >
          Enviar mensaje
        </button>
      </form>

      <div className='text-center text-slate-600 mt-4'>
        <p>📧 contacto@financia.cl</p>
        <p>📞 +56 9 8765 4321</p>
        <p>📍 Av. Providencia 1234, Santiago, Chile</p>
      </div>
    </section>
  )
}
