import { RegisterFormUserDto } from 'src/users/domain/dto/register-form-user-dto'
import { TokenResponseDto } from '../../../shared/domain/dto/token-response.dto'

export const REGISTER_USER_USECASE = 'REGISTER_USER_USECASE'
export interface RegisterUserUseCase {
  execute(createUserDto: RegisterFormUserDto): Promise<TokenResponseDto>
}
