type Role = 'USER' | 'ADMIN' | 'OPERATOR'

export interface User {
  id: number
  email: string
  name: string
  role: Role
}