import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: Services,
})

function Services() {
  return (
    <section className='px-6 py-12 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold text-center mb-8'>
        Nuestros Servicios
      </h1>
      <p className='text-slate-600 text-center mb-10'>
        En <strong>Financia</strong> impulsamos el crecimiento de las pequeñas y
        medianas empresas, ofreciendo soluciones financieras ágiles, flexibles y
        transparentes.
      </p>

      <div className='grid md:grid-cols-3 gap-8'>
        <article className='bg-white shadow rounded-xl p-6 border border-slate-200'>
          <h2 className='font-semibold text-xl mb-2 text-[#1183d4]'>
            Líneas de Crédito PyME
          </h2>
          <p className='text-slate-600'>
            Accede a financiamiento diseñado para tus necesidades operativas,
            con plazos flexibles y tasas competitivas para fortalecer tu capital
            de trabajo.
          </p>
        </article>

        <article className='bg-white shadow rounded-xl p-6 border border-slate-200'>
          <h2 className='font-semibold text-xl mb-2 text-[#1183d4]'>
            Factoring y Anticipo de Facturas
          </h2>
          <p className='text-slate-600'>
            Transforma tus facturas por cobrar en liquidez inmediata. Gestiona
            tu flujo de caja sin endeudarte y mantén tu negocio en movimiento.
          </p>
        </article>

        <article className='bg-white shadow rounded-xl p-6 border border-slate-200'>
          <h2 className='font-semibold text-xl mb-2 text-[#1183d4]'>
            Asesoría Financiera
          </h2>
          <p className='text-slate-600'>
            Nuestro equipo de expertos te guía en la toma de decisiones
            estratégicas, ayudándote a optimizar tus finanzas y alcanzar tus
            objetivos de crecimiento.
          </p>
        </article>
      </div>
    </section>
  )
}
