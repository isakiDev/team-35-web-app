import { LogoutResponseDto } from '../dto/logout-response.dto'

export const LOGOUT_AUTH_USE_CASE = 'LOGOUT_AUTH_USE_CASE'
export interface LogoutAuthUseCase {
  execute(userId: number): LogoutResponseDto
}
