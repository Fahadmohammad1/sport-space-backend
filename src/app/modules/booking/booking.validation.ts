import { z } from "zod";

const bookingZodSchema = z.object({
  body: z.object({
    date: z.string({ required_error: "Date is required" }),
    startTime: z.string(),
    endTime: z.string(),
    facility: z.string(),
  }),
});

export const BookingValidation = {
  bookingZodSchema,
};
