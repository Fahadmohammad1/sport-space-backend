import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";
import Facility from "../facility/facility.model";
import { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";
import { calculatePayableAmount } from "./booking.utils";

const createBooking = async (user: JwtPayload, bookingInfo: TBooking) => {
  // finding the user by provided user id
  const findUser = await User.findOne({ email: user.email });

  if (!findUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking if the facility is available or not
  const findFacility = await Facility.findOne({ _id: bookingInfo.facility });

  if (!findFacility || findFacility.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, "Facility is unavailable");
  }

  // calculating payable amount using a utility function
  const payableAmount = calculatePayableAmount(bookingInfo, findFacility);

  bookingInfo.user = findUser.id;
  const createdBooking = await Booking.create({
    ...bookingInfo,
    payableAmount,
  });

  if (!createdBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking Failed");
  }

  return createdBooking;
};

// find all bookings

const getAllBookings = async () => {
  return await Booking.find({});
};

// cancel a booking
const cancelBooking = async (bookingId: string, userInfo: JwtPayload) => {
  const isBookingExist = await Booking.findOne({ _id: bookingId }).populate(
    "user"
  );

  if (!isBookingExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking not found");
  }

  if (isBookingExist && isBookingExist.user !== userInfo.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const deletedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { isBooked: "canceled" },
    { new: true }
  );

  if (!deletedBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to cancel the booking");
  }

  return deletedBooking;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  cancelBooking,
};
