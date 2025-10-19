import { UserRole } from '../../../shared/domain/enums/user-role.enum'

export class AuthDto {
  id: number
  name: string
  email: string
  role: UserRole
  password: string
}
