interface Props {
  message: string | undefined
}

export const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="text-red-500 text-xs w-full pt-3">{message}</p>
  )
}
