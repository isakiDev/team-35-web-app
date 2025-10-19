import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UpdateAuthDto {
  /**
   * valida si es string y que no sea vacío
   */
  @IsNotEmpty()
  @IsString()
  firstName: string

  /**
   * valida si es string y que no sea vacío
   */
  @IsNotEmpty()
  @IsString()
  lastName: string

  /**
   * valida si es email y que no sea vacío
   */
  @IsNotEmpty()
  @IsEmail()
  email: string

  /**
   * valida si es string y como condicion un minimo de 8 caracteres y que no sea vacío
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string
}
