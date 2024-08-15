"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLES.USER), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.bookingZodSchema), booking_controller_1.BookingController.createBooking);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLES.ADMIN), booking_controller_1.BookingController.getAllBookings);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLES.USER), booking_controller_1.BookingController.cancelBooking);
exports.BookingRoutes = router;
