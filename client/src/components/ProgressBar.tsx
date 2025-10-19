interface Props {
  value: number
  maxValue: number
  style?: string
}

export const ProgressBar = ({ value, maxValue, style }: Props) => {
  const percent = (value / maxValue) * 100

  const defaulStyle = `flex flex-col gap-2 ${style}`

  return (
    <article className={defaulStyle}>
      <p className="text-sm text-slate-500 font-medium">Paso {value} de {maxValue}</p>
      <div className="h-2 bg-slate-300 w-full rounded-lg overflow-hidden">
        <div
          className="h-2 bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </article>
  )
}