import { createFileRoute, redirect } from '@tanstack/react-router'

import { Login } from '../../pages/Login/Login'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <Login />
}
