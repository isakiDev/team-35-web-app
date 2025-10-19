import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { type AuthStatus } from '../stores/slices/auth.slice'

import Footer from '../components/Footer'
import Header from '../components/Header'

import type { User } from '../interfaces'

interface MyRouterContext {
  auth: {
    user: User | null
    status: AuthStatus
    isAuthenticated: boolean
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <div className='bg-slate-200 w-full text-slate-950 flex-1 flex flex-col'>
        <Outlet />
      </div>

      <Footer />
    </div>
  ),
})
