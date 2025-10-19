import { Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { ValidateTokenUseCase } from 'src/auth/domain/usecase/validate-token-usecase'
import { TokenResponseDto } from 'src/shared/domain/dto/token-response.dto'
import { TOKEN_SERVICE } from 'src/shared/domain/service/toker.service'
import type { TokenService } from 'src/shared/domain/service/toker.service'

@Injectable()
export class ValidateTokenImplUseCase implements ValidateTokenUseCase {
  constructor(
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}

  async execute(request: Request): Promise<TokenResponseDto> {
    const token = this.tokenService.extractToken(request)
    return this.tokenService.validateAndRenewToken(token)
  }
}
