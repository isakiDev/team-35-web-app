import { Module } from '@nestjs/common'
import { PasswordImplService } from 'src/shared/application/service/password-impl.service'
import { TokenImplService } from 'src/shared/application/service/token-imple.service'
import { PASSWORD_SERVICE } from 'src/shared/domain/service/password.service'
import { TOKEN_SERVICE } from 'src/shared/domain/service/toker.service'
import { SharedModule } from 'src/shared/shared.module'
import { USER_REPOSITORY } from './domain/repository/user.repository'
import { UserPgRepository } from './infraestructure/repository/user-pg.repository'
import { userController } from './infraestructure/controller/user.controller'
import { REGISTER_USER_USECASE } from './domain/usecase/register-user.usecase'
import { RegisterUserImplUseCase } from './application/usecase/register-user-impl.usecase'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordImplService,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: TokenImplService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserPgRepository,
    },
    {
      provide: REGISTER_USER_USECASE, // ← Registra el provider aquí
      useClass: RegisterUserImplUseCase,
    },
  ],
  controllers: [userController],
  exports: [],
})
export class UsersModule {}
