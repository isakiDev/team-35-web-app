import { Injectable } from '@nestjs/common'
import { LogoutResponseDto } from 'src/auth/domain/dto/logout-response.dto'
import { LogoutAuthUseCase } from 'src/auth/domain/usecase/logout-auth.usecase'

@Injectable()
export class LogoutAuthImplUseCase implements LogoutAuthUseCase {
  execute(userId: number): LogoutResponseDto {
    // Por ahora sin BD - solo responde éxito
    return {
      id: userId,
      success: true,
      message: 'Logout exitoso. Elimina el token del cliente.',
    } as LogoutResponseDto
  }
}
