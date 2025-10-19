import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TokenResponseDto } from 'src/shared/domain/dto/token-response.dto'
import { RegisterFormUserDto } from 'src/users/domain/dto/register-form-user-dto'
import { REGISTER_USER_USECASE } from 'src/users/domain/usecase/register-user.usecase'
import type { RegisterUserUseCase } from 'src/users/domain/usecase/register-user.usecase'

@ApiTags('Users')
@Controller('user')
export class userController {
  constructor(
    @Inject(REGISTER_USER_USECASE)
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}
  /**
   * Register a new user account
   *
   * @description Creates a new user with email and password credentials.
   * Validates input and returns user data upon successful registration.
   *
   * @param {CreateAuthDto} dto - User registration data
   * @returns {Promise<AuthDto>} Registered user information
   * @throws {BadRequestException} When required fields are missing
   *
   * @example
   * POST /auth/register
   * {
   *   "email": "user@example.com",
   *   "password": "securePassword123"
   * }
   */
  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description:
      'Creates a new user account with email and password credentials',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered and returned',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input - email and password are required',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - user with this email already exists',
  })
  async register(
    @Body() registerForm: RegisterFormUserDto,
  ): Promise<TokenResponseDto> {
    return await this.registerUserUseCase.execute(registerForm)
  }
}
