import { UserRole } from '../../../shared/domain/enums/user-role.enum'

export class UserDbResponseDto {
  id: number
  name: string
  email: string
  role: UserRole
  password: string
}
