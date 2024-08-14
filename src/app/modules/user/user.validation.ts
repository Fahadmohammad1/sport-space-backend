import { z } from "zod";

const userZodSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.string(),
  address: z.string(),
});

export const UserValidation = {
  userZodSchema,
};
