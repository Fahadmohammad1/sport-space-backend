"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: "Date is required" }),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
        facility: zod_1.z.string(),
    }),
});
exports.BookingValidation = {
    bookingZodSchema,
};
