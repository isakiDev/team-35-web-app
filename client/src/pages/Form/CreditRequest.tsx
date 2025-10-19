import React, { useState } from 'react'

import { CreditRequestCompany } from '../../components/CreditRequestCompany'
import { ProgressBar } from '../../components/ProgressBar'
import { CreditRequestFiles } from '../../components/CreditRequestFiles'

interface FormData {
  companyId: number | null
  files: File[] | null
}

export const CreditRequest = () => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData | null>(null)

  const selectCompany = (companyId: number) => {
    setFormData({ companyId, files: null })
    setStep(2)
  }

  const selectFiles = (files: File[]) => {
    setFormData(prev => ({ ...prev!, files }))
    setStep(3)
  }

  const changeStep = (value: number) => {
    setStep(value)
  }

  const stepsComponent: Record<number, React.JSX.Element> = {
    1: <CreditRequestCompany onSelectCompany={selectCompany} />,
    2: <CreditRequestFiles onSelectFiles={selectFiles} onChangeStep={changeStep} />,
    3: <p>Status: Review</p>
  }

  return (
    <section className="flex flex-col gap-4 max-w-[40rem] mx-auto px-4 sm:px-0 w-full py-10">
      <ProgressBar value={step} maxValue={3} />

      {
        stepsComponent[step]
      }

    </section>
  )
}