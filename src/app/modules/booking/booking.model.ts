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
    facility: {
      type: String,
      required: true,
      ref: "user",
    },
    isBooked: {
      type: String,
      default: "unconfirmed",
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
