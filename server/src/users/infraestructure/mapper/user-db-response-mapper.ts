import { User } from '@prisma/client'
import { UserRole } from 'src/shared/domain/enums/user-role.enum'
import { UserDbResponseDto } from 'src/users/domain/dto/user-db-response.dto'

export class UserDbResponseMapper {
  static toDto(user: User): UserDbResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
      password: user.password,
    }
  }
}
