import { RegisterFormUserDto } from 'src/users/domain/dto/register-form-user-dto'
import { UserCreateValidatedDto } from 'src/users/domain/dto/user-create-validated.dto'

export class RegisterResponseMapper {
  static toDto(
    registerFormUserDto: RegisterFormUserDto,
    hashedPassword: string,
  ): UserCreateValidatedDto {
    return {
      name: registerFormUserDto.name,
      email: registerFormUserDto.email,
      password: hashedPassword,
    }
  }
}
