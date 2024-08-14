import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../enums/user";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLES.USER), BookingController.createBooking);

export const BookingRoutes = router;
