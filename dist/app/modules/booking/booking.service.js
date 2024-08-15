"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const booking_model_1 = __importDefault(require("./booking.model"));
const facility_model_1 = __importDefault(require("../facility/facility.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const booking_utils_1 = require("./booking.utils");
const createBooking = (user, bookingInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // finding the user by provided user id
    const findUser = yield user_model_1.default.findOne({ email: user.email });
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    // checking if the facility is available or not
    const findFacility = yield facility_model_1.default.findOne({ _id: bookingInfo.facility });
    if (!findFacility || findFacility.isDeleted) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Facility is unavailable");
    }
    // calculating payable amount using a utility function
    const payableAmount = (0, booking_utils_1.calculatePayableAmount)(bookingInfo, findFacility);
    bookingInfo.user = findUser.id;
    const createdBooking = yield booking_model_1.default.create(Object.assign(Object.assign({}, bookingInfo), { payableAmount }));
    if (!createdBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Booking Failed");
    }
    return createdBooking;
});
// find all bookings
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.default.find({});
});
// cancel a booking
const cancelBooking = (bookingId, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingExist = yield booking_model_1.default.findOne({ _id: bookingId }).populate("user");
    if (!isBookingExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking not found");
    }
    if (isBookingExist && isBookingExist.user !== userInfo.id) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access");
    }
    const deletedBooking = yield booking_model_1.default.findByIdAndUpdate(bookingId, { isBooked: "canceled" }, { new: true });
    if (!deletedBooking) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to cancel the booking");
    }
    return deletedBooking;
});
exports.BookingService = {
    createBooking,
    getAllBookings,
    cancelBooking,
};
