export class LoginResponse {
  access_token: string
  refresh_token?: string
  user: {
    id: number
    email: string
    name?: string
    role?: string
  }
  expires_in: number
}
