import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLES.USER),
  validateRequest(BookingValidation.bookingZodSchema),
  BookingController.createBooking
);
router.get("/", auth(ENUM_USER_ROLES.ADMIN), BookingController.getAllBookings);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLES.USER),
  BookingController.cancelBooking
);

export const BookingRoutes = router;
