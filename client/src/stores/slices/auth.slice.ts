import { type StateCreator } from 'zustand'

import { type User } from '../../interfaces'

export type AuthStatus = 'PENDING' | 'AUTHENTICATED' | 'UNAUTHENTICATED'

export interface AuthSlice {
  user: User | null,
  status: AuthStatus

  signIn: (user: User) => void
  signOut: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  status: 'PENDING',

  signIn: (user) => set(() => ({ user, status: 'AUTHENTICATED' })),
  signOut: () => set(() => ({ user: null, status: 'UNAUTHENTICATED' })),
})