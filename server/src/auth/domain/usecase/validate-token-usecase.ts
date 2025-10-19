import { Request } from 'express'
import { TokenResponseDto } from 'src/shared/domain/dto/token-response.dto'

export const VALIDATE_TOKEN_USE_CASE = 'VALIDATE_TOKEN_USE_CASE'
export interface ValidateTokenUseCase {
  execute(token: Request): Promise<TokenResponseDto>
}
