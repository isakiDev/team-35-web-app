import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about-us')({
  component: AboutUs,
})

function AboutUs() {
  return (
    <section className='px-6 py-12 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold text-center mb-8'>Conócenos</h1>
      <p className='text-slate-600 text-lg text-center mb-8'>
        En <strong>Financia</strong> creemos en el poder de las PyMEs como motor
        del desarrollo económico. Nuestra misión es entregar herramientas
        financieras que impulsen su crecimiento, promoviendo la innovación y la
        sostenibilidad.
      </p>

      <div className='space-y-6 text-slate-600'>
        <p>
          Desde nuestros inicios, nos propusimos simplificar el acceso al
          crédito y las soluciones de financiamiento, con procesos rápidos,
          transparentes y 100% digitales.
        </p>
        <p>
          Contamos con un equipo multidisciplinario de profesionales del área
          financiera, tecnológica y comercial, comprometidos en ofrecer un
          servicio ágil y personalizado.
        </p>
        <p>
          Nuestra visión es convertirnos en el aliado financiero estratégico de
          las PyMEs, acompañándolas en cada etapa de su crecimiento.
        </p>
      </div>
    </section>
  )
}
