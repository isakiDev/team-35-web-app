import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { TokenResponseDto } from 'src/shared/domain/dto/token-response.dto'
import { RegisterUserUseCase } from 'src/users/domain/usecase/register-user.usecase'
import { RegisterFormUserDto } from '../../domain/dto/register-form-user-dto'
import type { UserRepository } from 'src/users/domain/repository/user.repository'
import { USER_REPOSITORY } from 'src/users/domain/repository/user.repository'
import { RegisterResponseMapper } from 'src/users/infraestructure/mapper/register-response.mapper'
import { UserPayloadDto } from 'src/users/domain/dto/user-payload.dto'
import type { PasswordService } from 'src/shared/domain/service/password.service'
import { PASSWORD_SERVICE } from 'src/shared/domain/service/password.service'
import { TOKEN_SERVICE } from 'src/shared/domain/service/toker.service'
import type { TokenService } from 'src/shared/domain/service/toker.service'

@Injectable()
export class RegisterUserImplUseCase implements RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: PasswordService,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}
  async execute(registerForm: RegisterFormUserDto): Promise<TokenResponseDto> {
    const existing = await this.userRepository.findByEmail(registerForm.email)

    if (existing) throw new ConflictException('Email already registered')
    const hashedPassword = await this.passwordService.hashPassword(
      registerForm.password,
    )
    const userCreated = await this.userRepository.create(
      RegisterResponseMapper.toDto(registerForm, hashedPassword),
    )
    if (!userCreated) throw new ConflictException('Error to create user')

    const userPayload = {
      id: userCreated.id,
      email: userCreated.email,
      role: userCreated.role,
      name: userCreated.name,
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
