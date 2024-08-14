import { z } from "zod";

const facilityZodSchema = z.object({
  name: z.string(),
  description: z.string(),
  pricePerHour: z.number(),
  location: z.string(),
});

export const FacilityValidation = {
  facilityZodSchema,
};
