import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/policies')({
  component: Policies,
})

function Policies() {
  return (
    <section className='px-6 py-12 max-w-4xl mx-auto text-slate-700 leading-relaxed'>
      <h1 className='text-3xl font-bold text-center mb-8'>
        Política de Privacidad
      </h1>
      <p>
        En <strong>Financia</strong> respetamos y protegemos la privacidad de
        nuestros usuarios. Esta política describe cómo recopilamos, usamos y
        protegemos la información personal.
      </p>

      <h2 className='font-semibold text-xl mt-6 mb-2'>
        1. Información recopilada
      </h2>
      <p>
        Recopilamos datos personales como nombre, correo electrónico, número de
        contacto y empresa con el propósito de ofrecer nuestros servicios
        financieros.
      </p>

      <h2 className='font-semibold text-xl mt-6 mb-2'>
        2. Uso de la información
      </h2>
      <p>
        La información es utilizada exclusivamente para procesar solicitudes,
        mejorar la atención y enviar información relevante sobre nuestros
        productos.
      </p>

      <h2 className='font-semibold text-xl mt-6 mb-2'>
        3. Protección de datos
      </h2>
      <p>
        Implementamos medidas de seguridad administrativas y tecnológicas para
        resguardar la información personal de accesos no autorizados.
      </p>

      <h2 className='font-semibold text-xl mt-6 mb-2'>
        4. Derechos del usuario
      </h2>
      <p>
        El usuario puede solicitar en cualquier momento la actualización o
        eliminación de sus datos personales enviando un correo a{' '}
        <strong>privacidad@financia.cl</strong>.
      </p>
    </section>
  )
}
