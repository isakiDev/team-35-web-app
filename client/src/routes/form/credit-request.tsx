import { createFileRoute } from '@tanstack/react-router'
import { CreditRequest } from '../../pages/Form/CreditRequest'

export const Route = createFileRoute('/form/credit-request')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreditRequest />
}
