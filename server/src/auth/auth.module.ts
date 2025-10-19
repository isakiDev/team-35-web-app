import { Module } from '@nestjs/common'
import { AuthController } from './infraestructure/controller/auth.controller'
import { LOGOUT_AUTH_USE_CASE } from './domain/usecase/logout-auth.usecase'
import { LogoutAuthImplUseCase } from './application/usecase/logout-auth-impl.usecase'
import { LoginAuthImplUseCase } from './application/usecase/login-auth-impl.usecase'
import { SharedModule } from 'src/shared/shared.module'
import { LOGIN_AUTH_USE_CASE } from './domain/usecase/login-auth.usecase'
import { ValidateTokenImplUseCase } from './application/usecase/validate-token-impl.usecase'
import { VALIDATE_TOKEN_USE_CASE } from './domain/usecase/validate-token-usecase'
import { PasswordImplService } from 'src/shared/application/service/password-impl.service'
import { PASSWORD_SERVICE } from 'src/shared/domain/service/password.service'
import { TokenImplService } from 'src/shared/application/service/token-imple.service'
import { TOKEN_SERVICE } from 'src/shared/domain/service/toker.service'
import { USER_REPOSITORY } from 'src/users/domain/repository/user.repository'
import { UserPgRepository } from 'src/users/infraestructure/repository/user-pg.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/shared/infraestructure/strategies/jwt.strategy'

@Module({
  imports: [SharedModule, PassportModule],
  providers: [
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: UserPgRepository,
    },
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordImplService,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: TokenImplService,
    },
    {
      provide: LOGIN_AUTH_USE_CASE,
      useClass: LoginAuthImplUseCase,
    },
    {
      provide: LOGOUT_AUTH_USE_CASE,
      useClass: LogoutAuthImplUseCase,
    },
    {
      provide: VALIDATE_TOKEN_USE_CASE,
      useClass: ValidateTokenImplUseCase,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
