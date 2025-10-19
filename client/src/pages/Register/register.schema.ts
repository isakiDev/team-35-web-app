import { z } from "zod"

export interface FormData {
  email: string
  password: string
  confirmPassword: string
}

export const invoiceSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "El nombre es obligatorio" }),

  email: z
    .email({ message: "El formato del correo electrónico no es válido" })
    .nonempty({ message: "El correo electrónico es obligatorio" }),

  password: z
    .string()
    .nonempty({ message: "La contraseña es obligatoria" }),

  confirmPassword: z.string().nonempty("La contraseña es obligatoria")
}).superRefine((items, ctx) => {
  if (items.password != items.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'La contraseñas deben ser iguales',
      path: ['confirmPassword']
    })
  }
})


export type RegisterFormValues = z.infer<typeof invoiceSchema>