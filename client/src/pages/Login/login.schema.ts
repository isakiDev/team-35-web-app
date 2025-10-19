import { z } from "zod"

export interface FormData {
  email: string
  password: string
}

export const invoiceSchema = z.object({
  email: z
    .email({ message: "El formato del correo electrónico no es válido" })
    .nonempty({ message: "El correo electrónico es obligatorio" }),

  password: z
    .string()
    .nonempty({ message: "La contraseña es obligatoria" })
});

export type LoginFormValues = z.infer<typeof invoiceSchema>