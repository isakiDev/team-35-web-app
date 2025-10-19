// src/shared/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayloadGuardDto } from 'src/shared/domain/dto/jwt-payload-guard.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // ← Agrega 'jwt' aquí
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    })
  }

  validate(jwtPayloadGuardDto: JwtPayloadGuardDto): JwtPayloadGuardDto {
    return jwtPayloadGuardDto
  }
}
