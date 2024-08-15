"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingZodSchema = zod_1.z.object({
    date: zod_1.z.string(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
    user: zod_1.z.string(),
    facility: zod_1.z.string(),
    payableAmount: zod_1.z.number(),
});
exports.BookingValidation = {
    bookingZodSchema,
};
