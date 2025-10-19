import { LoginResponse } from '../dto/login-response.dto'

export const LOGIN_AUTH_USE_CASE = 'LOGIN_AUTH_USE_CASE'
export interface LoginAuthUseCase {
  execute(password: string, email: string): Promise<LoginResponse>
}
