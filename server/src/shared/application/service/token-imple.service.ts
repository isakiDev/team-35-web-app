// token-impl.service.ts - CORREGIDO
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { JwtPayloadDto } from 'src/shared/domain/dto/jwt-payload.dto'
import { USER_REPOSITORY } from 'src/users/domain/repository/user.repository'
import { TokenResponseDto } from 'src/shared/domain/dto/token-response.dto'
import { UserPayloadDto } from 'src/users/domain/dto/user-payload.dto'
import type { UserRepository } from 'src/users/domain/repository/user.repository'
import { TokenService } from 'src/shared/domain/service/toker.service'

@Injectable()
export class TokenImplService implements TokenService {
  constructor(
    private readonly jwtService: JwtService, // ← Ya configurado con JwtModule.register()
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async createToken(payload: UserPayloadDto): Promise<string> {
    // SOLUCIÓN: Usa la configuración del módulo, no pases secret/expiresIn
    return await this.jwtService.signAsync(payload)
  }

  async validateAndRenewToken(token: string): Promise<TokenResponseDto> {
    // SOLUCIÓN: Usa verify sin pasar secret
    const payload = await this.jwtService.verifyAsync<JwtPayloadDto>(token)

    if (!payload) throw new UnauthorizedException('Token is invalid')

    // Obtener datos completos del usuario desde la base de datos
    const user = await this.userRepository.findByEmail(payload.email)
    if (!user) throw new UnauthorizedException('User not found')

    const userPayload: UserPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    }

    const newToken = await this.createToken(userPayload)

    return {
      access_token: newToken,
      user: userPayload,
      expires_in: 3600,
      valid: true,
    }
  }

  extractToken(request: Request): string {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header')
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format')
    }

    return authHeader.substring(7)
  }
}
