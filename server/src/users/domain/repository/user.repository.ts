import { UserDbResponseDto } from 'src/users/domain/dto/user-db-response.dto'
import { UserCreateValidatedDto } from '../dto/user-create-validated.dto'

export const USER_REPOSITORY = 'USER_REPOSITORY'

export interface UserRepository {
  create(user: UserCreateValidatedDto): Promise<UserDbResponseDto | null>
  findByEmail(email: string): Promise<UserDbResponseDto | null>
  findOne(id: number): Promise<UserDbResponseDto | null>
}
