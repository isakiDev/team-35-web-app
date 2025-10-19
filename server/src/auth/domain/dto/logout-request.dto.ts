import { Request } from 'express'

export interface logoutRequestDto extends Request {
  user: {
    id: number
    email: string
    role: string
    tokenVersion: number
  }
}
