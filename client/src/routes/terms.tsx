import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: Terms,
})

function Terms() {
  return (
    <section className='px-6 py-12 max-w-4xl mx-auto text-slate-700 leading-relaxed'>
      <h1 className='text-3xl font-bold text-center mb-8'>
        Términos y Condiciones
      </h1>
      <p>
        Al acceder y utilizar los servicios de <strong>Financia</strong>, el
        usuario acepta los presentes términos y condiciones, que regulan el uso
        de la plataforma y los productos financieros ofrecidos.
      </p>

      <h2 className='font-semibold text-xl mt-6 mb-2'>1. Uso del sitio</h2>
      <p>
        El usuario se compromete a utilizar esta plataforma únicamente con fines
        legítimos y conforme a las leyes vigentes.
      </p>

      <h2 className='font-semibold text-xl mt-6 mb-2'>
        2. Servicios financieros
      </h2>
      <p>
        Financia actúa como intermediario en la gestión de créditos y productos
        financieros dirigidos a pequeñas y medianas empresas. Toda solicitud
        está sujeta a evaluación y aprobación.
      </p>

      <h2 className='font-semibold text-xl mt-6 mb-2'>3. Responsabilidad</h2>
      <p>
        Financia no se hace responsable por pérdidas o daños derivados del uso
        inadecuado del sitio o de la información proporcionada por terceros.
      </p>

      <p className='mt-6'>
        Estos términos pueden actualizarse sin previo aviso. Recomendamos
        revisarlos periódicamente.
      </p>
    </section>
  )
}
