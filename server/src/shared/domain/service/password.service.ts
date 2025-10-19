export const PASSWORD_SERVICE = 'PASSWORD_SERVICE'
export interface PasswordService {
  hashPassword(password: string): Promise<string>

  comparePassword(password: string, hashedPassword: string): Promise<boolean>
}
