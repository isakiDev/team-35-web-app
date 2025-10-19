import type {
  ErrorResponse,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  ValidateTokenResponse,
} from '../interfaces/auth.interface'

const URL = import.meta.env.VITE_BASE_URL
const PORT = import.meta.env.VITE_PORT

const BASE_URL = URL + PORT

export const registerService = async (
  data: RegisterInput
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw error
    }

    const result: RegisterResponse = await response.json()

    return result
  } catch (error) {
    handleError(error as ErrorResponse)
  }
}

export const loginService = async (
  data: LoginInput
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw error
    }

    const result: LoginResponse = await response.json()

    return result
  } catch (error) {
    handleError(error as ErrorResponse)
  }
}

export const validateTokenService = async (
  token: string
): Promise<ValidateTokenResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/validate-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw error
    }

    const result: ValidateTokenResponse = await response.json()

    return result
  } catch (error) {
    handleError(error as ErrorResponse)
  }
}

const handleError = (error: ErrorResponse) => {
  const message = Array.isArray(error.message)
    ? error.message.join('\n\n')
    : (error.message ?? 'Unexpected error')

  throw new Error(message)
}
