import { createFileRoute, redirect } from '@tanstack/react-router'

import { Register } from '../../pages/Register/Register'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <Register />
}
