import { useState } from "react"

import type { Company } from "../interfaces"

interface Props {
  onSelectCompany: (companyId: number) => void
}

export const CreditRequestCompany = ({ onSelectCompany }: Props) => {

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const handleSelectCompany = () => {
    if (!selectedCompany) return

    onSelectCompany(selectedCompany.id)
  }

  const companies = [
    {
      id: 1,
      name: 'InovaTech Solutions',
      type: 'Sociedad limitada',
      taxId: '76.123.456-7',
      activity: 'Servicios de software',
      employeeCount: 25,
      address: 'Av. Providencia 1234, Santiago',
      website: 'https://innovatech.cl',
      email: 'contacto@innovatech.cl',
    },
    {
      id: 2,
      name: 'EcoVerde Ltda',
      type: 'Sociedad por acciones',
      taxId: '78.987.654-3',
      activity: 'Producción agrícola sustentable',
      employeeCount: 12,
      address: 'Camino Los Olivos 455, Rancagua',
      website: 'https://ecoverde.cl',
      email: 'info@ecoverde.cl',
    },
    {
      id: 3,
      name: 'ConstruMax Chile',
      type: 'E.I.R.L.',
      taxId: '77.555.444-1',
      activity: 'Construcción e infraestructura',
      employeeCount: 48,
      address: 'Av. Los Presidentes 2211, La Florida',
      website: 'https://construmax.cl',
      email: 'ventas@construmax.cl',
    },
  ]

  const inputStyle =
    'text-sm font-normal outline w-full rounded-sm outline-slate-300 p-2 mt-1 transition-colors duration-200'
  const activeStyle = 'bg-slate-200 text-slate-800'
  const disabledStyle = 'bg-slate-300 text-slate-600 cursor-not-allowed'

  return (
    <div className='bg-slate-100 rounded-xl flex flex-col items-center p-8 border border-slate-200 shadow'>
      <header className='text-center mb-6'>
        <h1 className='font-bold text-2xl pb-2'>Solicitud de crédito para tu PYME</h1>
        <p className='text-xs text-slate-600'>
          Selecciona tu empresa para visualizar su información.
        </p>

        {/* Dropdown select company */}
        <div className="py-5">
          <select
            className={`${inputStyle} ${activeStyle} text-center hover:cursor-pointer hover:bg-slate-300`}
            onChange={(e) => {
              const pyme = companies.find((p) => p.name === e.target.value)
              setSelectedCompany(pyme || null)
            }}
            defaultValue=''
          >
            <option value='' disabled>
              Selecciona tu PYME
            </option>

            {
              companies.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))
            }
          </select>
        </div>
      </header>

      <footer className="grid sm:grid-cols-2 gap-4">
        {/* Campos de solo lectura */}
        <div>
          <label className='text-xs text-slate-950'>Nombre de la empresa</label>
          <input
            disabled
            value={selectedCompany?.name || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='text'
            placeholder='Ej: InovaTech Solutions'
          />
        </div>

        <div>
          <label className='text-xs text-slate-950'>Tipo de empresa</label>
          <input
            disabled
            value={selectedCompany?.type || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='text'
            placeholder='Ej: Sociedad limitada'
          />
        </div>

        <div>
          <label className='text-xs text-slate-950'>RUT / Tax ID</label>
          <input
            disabled
            value={selectedCompany?.taxId || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='text'
            placeholder='Ej: 76.123.456-7'
          />
        </div>

        <div>
          <label className='text-xs text-slate-950'>Actividad o rubro</label>
          <input
            disabled
            value={selectedCompany?.activity || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='text'
            placeholder='Ej: Servicios de software'
          />
        </div>

        <div>
          <label className='text-xs text-slate-950'>Número de empleados</label>
          <input
            disabled
            value={selectedCompany?.employeeCount || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='number'
            placeholder='Ej: 25'
          />
        </div>

        <div>
          <label className='text-xs text-slate-950'>Dirección</label>
          <input
            disabled
            value={selectedCompany?.address || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='text'
            placeholder='Ej: Av. Providencia 1234, Santiago'
          />
        </div>

        <div>
          <label className='text-xs text-slate-950'>Sitio web (opcional)</label>
          <input
            disabled
            value={selectedCompany?.website || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='url'
            placeholder='Ej: https://innovatech.cl'
          />
        </div>

        <div>
          <label className='text-xs text-slate-950'>Correo electrónico</label>
          <input
            disabled
            value={selectedCompany?.email || ''}
            className={`${inputStyle} ${disabledStyle}`}
            type='email'
            placeholder='Ej: contacto@innovatech.cl'
          />
        </div>
      </footer>

      <button
        onClick={handleSelectCompany}
        className='py-2 px-4 bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-700 transition mt-10 hover:cursor-pointer w-full'
      >
        Guardar y continuar
      </button>
    </div>
  )
}
