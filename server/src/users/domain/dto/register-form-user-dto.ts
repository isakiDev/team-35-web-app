import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

// Validador personalizado para confirmar password
@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const { password } = args.object as { password: string }
    return password === confirmPassword
  }

  defaultMessage() {
    return 'Passwords do not match'
  }
}

export class RegisterFormUserDto {
  @ApiProperty({
    example: 'Juan Perez',
    description: 'Full name of the user',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name can only contain letters and spaces',
  })
  name: string

  @ApiProperty({
    example: 'user@example.com',
    description: 'Valid email address for account verification and login',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string

  @ApiProperty({
    example: 'SecurePassword123!',
    description:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Password confirmation - must match the password field',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @IsString()
  @Validate(PasswordMatchConstraint, {
    message: 'Passwords do not match',
  })
  confirmPassword: string
}
