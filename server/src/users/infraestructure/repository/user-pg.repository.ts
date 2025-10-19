import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/infraestructure/database/prisma.service'
import { UserDbResponseDto } from 'src/users/domain/dto/user-db-response.dto'
import { UserCreateValidatedDto } from 'src/users/domain/dto/user-create-validated.dto'
import { UserRepository } from 'src/users/domain/repository/user.repository'
import { UserDbResponseMapper } from '../mapper/user-db-response-mapper'

@Injectable()
export class UserPgRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userValidated: UserCreateValidatedDto,
  ): Promise<UserDbResponseDto | null> {
    const user = await this.prismaService.user.create({
      data: userValidated,
    })
    return UserDbResponseMapper.toDto(user)
  }

  async findByEmail(email: string): Promise<UserDbResponseDto | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email },
    })
    return user ? UserDbResponseMapper.toDto(user) : null
  }

  async findOne(id: number): Promise<UserDbResponseDto | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id: id },
    })
    return user ? UserDbResponseMapper.toDto(user) : null
  }
}
