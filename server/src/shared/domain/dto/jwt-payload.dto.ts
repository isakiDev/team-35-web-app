export interface JwtPayloadDto {
  userId: string
  email: string
  iat?: number
  exp?: number
}
