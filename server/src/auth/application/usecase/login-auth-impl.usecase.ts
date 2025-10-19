import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { LoginAuthUseCase } from 'src/auth/domain/usecase/login-auth.usecase'
import { LoginResponse } from 'src/auth/domain/dto/login-response.dto'
import type { UserRepository } from 'src/users/domain/repository/user.repository'
import { USER_REPOSITORY } from 'src/users/domain/repository/user.repository'
import { UserPayloadDto } from 'src/users/domain/dto/user-payload.dto'
import type { PasswordService } from 'src/shared/domain/service/password.service'
import { PASSWORD_SERVICE } from 'src/shared/domain/service/password.service'
import type { TokenService } from 'src/shared/domain/service/toker.service'
import { TOKEN_SERVICE } from 'src/shared/domain/service/toker.service'

@Injectable()
export class LoginAuthImplUseCase implements LoginAuthUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: PasswordService,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}
  async execute(password: string, email: string): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new ConflictException('Email is incorrect')

    const isPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    )
    if (!isPassword) throw new UnauthorizedException('Password is incorrect')

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    } as UserPayloadDto

    const accessToken = await this.tokenService.createToken(userPayload)
    if (!accessToken) throw new ConflictException('Error creating token')

    return {
      access_token: accessToken,
      user: userPayload,
      expires_in: 3600,
    }
  }
}
