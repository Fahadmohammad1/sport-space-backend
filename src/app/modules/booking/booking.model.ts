import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    facility: {
      type: String,
      required: true,
      ref: "Facility",
    },
    payableAmount: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: String,
      default: "confirmed",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
