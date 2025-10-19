import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common'
import { LoginDto } from '../../domain/dto/login.dto'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { LoginResponse } from 'src/auth/domain/dto/login-response.dto'
import { LOGIN_AUTH_USE_CASE } from 'src/auth/domain/usecase/login-auth.usecase'
import type { LoginAuthUseCase } from 'src/auth/domain/usecase/login-auth.usecase'
import type { logoutRequestDto } from 'src/auth/domain/dto/logout-request.dto'
import type { LogoutAuthUseCase } from 'src/auth/domain/usecase/logout-auth.usecase'
import { LOGOUT_AUTH_USE_CASE } from 'src/auth/domain/usecase/logout-auth.usecase'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger'
import { LogoutResponseDto } from 'src/auth/domain/dto/logout-response.dto'
import type { ValidateTokenUseCase } from 'src/auth/domain/usecase/validate-token-usecase'
import { VALIDATE_TOKEN_USE_CASE } from 'src/auth/domain/usecase/validate-token-usecase'
import type { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'

/**
 * Authentication Controller
 *
 * @description Handles user authentication operations including registration,
 * login, and logout. Provides JWT-based authentication system.
 *
 * @class AuthController
 * @version 1.0
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_AUTH_USE_CASE)
    private readonly loginAuthImplUseCase: LoginAuthUseCase,

    @Inject(LOGOUT_AUTH_USE_CASE)
    private readonly logoutAuthUseCase: LogoutAuthUseCase,

    @Inject(VALIDATE_TOKEN_USE_CASE)
    private readonly validateTokenImplUseCase: ValidateTokenUseCase,
  ) {}

  /**
   * Authenticate user and generate access token
   *
   * @description Validates user credentials and returns authentication tokens
   * for accessing protected endpoints.
   *
   * @param {LoginDto} loginDto - User login credentials
   * @returns {Promise<LoginResponse>} Authentication tokens and user data
   * @throws {BadRequestException} When credentials are missing
   * @throws {UnauthorizedException} When credentials are invalid
   *
   * @example
   * POST /auth/login
   * {
   *   "email": "user@example.com",
   *   "password": "securePassword123"
   * }
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user',
    description:
      'Validates credentials and returns JWT tokens for authentication',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful - returns access token and user data',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - email and password are required',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid email or password',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    if (!loginDto.email || !loginDto.password) {
      throw new BadRequestException('Email and password are required')
    }
    return await this.loginAuthImplUseCase.execute(
      loginDto.password,
      loginDto.email,
    )
  }

  /**
   * Terminate user session
   *
   * @description Invalidates the current user's authentication token
   * and terminates the active session. Requires valid JWT authentication.
   *
   * @param {logoutRequestDto} req - Authenticated request object
   * @returns {Promise<{message: string}>} Success confirmation
   *
   * @example
   * POST /auth/logout
   * Headers: { "Authorization": "Bearer <jwt-token>" }
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Terminate user session',
    description:
      'Invalidates authentication token and ends user session. Requires JWT.',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful - session terminated',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing authentication token',
  })
  logout(@Req() req: logoutRequestDto): LogoutResponseDto {
    const userId = req.user.id
    return this.logoutAuthUseCase.execute(userId)
  }

  @Post('validate-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate and renew token' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  async validateToken(@Req() request: Request) {
    try {
      return await this.validateTokenImplUseCase.execute(request)
    } catch (error) {
      console.error(error)
    }
  }
}
