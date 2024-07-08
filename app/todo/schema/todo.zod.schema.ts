import { z } from "zod";

export const TodoZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Minimo 1 caracter" })
    .max(100, { message: "Maximo 100 caracteres" })
    .nonempty({ message: "El titulo es requerido" }),
});
