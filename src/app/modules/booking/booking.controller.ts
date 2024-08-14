import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await BookingService.createBooking(user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await BookingService.cancelBooking(id, user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  cancelBooking,
};
