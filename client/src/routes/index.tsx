import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <section className='bg-gray-800 text-center text-white py-12 px-4'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Financiación Rápida y Simplificada para tu PYME
        </h1>
        <p className='max-w-2xl mx-auto mb-8'>
          Accede a créditos con procesos ágiles y sin complicaciones. Impulsa el
          crecimiento de tu negocio con Financia.
        </p>
        <button className='px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition'>
          Solicita tu Crédito Ahora
        </button>
      </section>
      <section className='py-12'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Beneficios Clave de Financia
          </h2>
          <p className='text-gray-600 mb-12 max-w-2xl mx-auto'>
            Descubre cómo podemos ayudar a tu PYME a prosperar con nuestras
            soluciones de crédito a medida.
          </p>

          <div className='grid md:grid-cols-3 gap-6'>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-md transition'>
              <div className='text-blue-600 text-3xl mb-4'>⏱️</div>
              <h3 className='text-gray-600 font-semibold text-lg mb-2'>
                Aprobación Rápida
              </h3>
              <p className='text-gray-600 text-sm'>
                Obtén una respuesta en 24 horas y accede a los fondos en pocos
                días.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-md transition'>
              <div className='text-blue-600 text-3xl mb-4'>📝</div>
              <h3 className='text-gray-600 font-semibold text-lg mb-2'>
                Proceso Simplificado
              </h3>
              <p className='text-gray-600 text-sm'>
                Solicita tu crédito completamente en línea con mínimos
                requisitos.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-md transition'>
              <div className='text-blue-600 text-3xl mb-4'>🔒</div>
              <h3 className='text-gray-600 font-semibold text-lg mb-2'>
                Seguridad Garantizada
              </h3>
              <p className='text-gray-600 text-sm'>
                Tus datos están protegidos con la más alta tecnología de
                seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-gray-800 text-center text-white py-12'>
        <h2 className='text-2xl font-bold mb-4'>
          ¿Listo para Impulsar tu Negocio?
        </h2>
        <p className='mb-8 max-w-xl mx-auto p-2'>
          Comienza tu solicitud de crédito hoy mismo y da el siguiente gran paso
          para llevar tu PYME al éxito.
        </p>
        <button className='px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition'>
          Comenzar Solicitud
        </button>
      </section>
    </main>
  )
}
