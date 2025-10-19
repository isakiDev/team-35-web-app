import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PasswordService } from 'src/shared/domain/service/password.service'

@Injectable()
export class PasswordImplService implements PasswordService {
  private readonly saltRounds = 10

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds)
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
