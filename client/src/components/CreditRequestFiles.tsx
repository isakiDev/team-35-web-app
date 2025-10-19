import { useRef, useState } from 'react';
import { FileIcon } from './icons/FileIcon';

interface Props {
  onSelectFiles: (files: File[]) => void;
  onChangeStep: (step: number) => void
}

export const CreditRequestFiles = ({ onSelectFiles, onChangeStep }: Props) => {

  const [fileNames, setFileNames] = useState<Record<number, string>>({})

  const fileInputsRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const files: File[] = [];

    for (const value of formData.values()) {
      files.push(value as File)
    }

    if (files.length < 3) {
      alert('Por favor, selecciona al menos tres archivos');
      return;
    }

    onSelectFiles(files)
  };

  const handleContainerClick = (index: number) => {
    fileInputsRefs.current[index]?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name
      setFileNames(prev => ({ ...prev, [index]: fileName }))
    }
  };

  const inputFilesText = [
    {
      title: 'Documento de Identidad',
      description: 'Copia del documento de identidad del representante legal'
    },
    {
      title: 'Registro Mercantil',
      description: 'Copia del registro mercantil actualizado'
    },
    {
      title: 'Estados Financieros',
      description: 'Estados financieros del último año'
    },
    {
      title: 'RUC',
      description: 'Copia del RUC de la empresa'
    }
  ]

  return (
    <div className='w-full bg-slate-100 rounded-xl flex flex-col items-center p-8 border border-slate-200 shadow'>

      <header className='text-center mb-6'>
        <h1 className='font-bold text-2xl pb-2'>Documentos y Firma Digital</h1>
        <p className='text-xs text-slate-600'>
          Por favor, carga los documentos requeridos y completa la firma digital para finalizar tu solicitud de crédito.
        </p>
      </header>

      <form encType='multipart/form-data' onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <h2 className='font-semibold'>Documentos requeridos</h2>

        {inputFilesText.map(({ title, description }, index) => (
          <div onClick={() => handleContainerClick(index)} key={index} className="flex items-center gap-5 bg-slate-200 rounded-md p-4 outline outline-slate-300 hover:cursor-pointer hover:bg-slate-300">
            <div className='bg-blue-200/70 p-3 rounded-lg hidden sm:block'>
              <FileIcon />
            </div>

            <div>
              <h3>{title}</h3>
              <p className='text-sm text-slate-600'>{description}</p>
              <p className='text-xs font-semibold text-green-900'>{fileNames[index]}</p>
            </div>

            <input
              name={index.toString()}
              type="file"
              accept="application/pdf"
              hidden
              ref={e => { fileInputsRefs.current[index] = e }}
              onChange={e => handleInputChange(e, index)}
            />
          </div>
        ))}

        <div className='flex gap-2'>
          <button
            className="py-2 px-4 rounded-xl text-slate-700 font-semibold border border-slate-300 hover:border-slate-400 transition hover:cursor-pointer w-full"
            onClick={() => onChangeStep(1)}
          >
            Regresar
          </button>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-700 transition hover:cursor-pointer w-full"
          >
            Firmar
          </button>
        </div>
      </form>

    </div>
  );
};
