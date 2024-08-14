import { z } from "zod";

const bookingZodSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  user: z.string(),
  facility: z.string(),
  payableAmount: z.number(),
});

export const BookingValidation = {
  bookingZodSchema,
};
