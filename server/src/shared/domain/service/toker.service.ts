import { TokenResponseDto } from 'src/shared/domain/dto/token-response.dto'
import { Request } from 'express'
import { UserPayloadDto } from 'src/users/domain/dto/user-payload.dto'

export const TOKEN_SERVICE = 'TOKEN_SERVICE'
export interface TokenService {
  createToken(payload: UserPayloadDto): Promise<string>
  validateAndRenewToken(token: string): Promise<TokenResponseDto>
  extractToken(request: Request): string
}
