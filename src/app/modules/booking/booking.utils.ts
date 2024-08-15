import { TFacility } from "../facility/facility.interface";
import { TBooking } from "./booking.interface";

export const calculatePayableAmount = (
  bookingInfo: TBooking,
  facility: TFacility
) => {
  const startDateTime = new Date(
    `${bookingInfo.date}T${bookingInfo.startTime}`
  ).getTime();

  const endDateTime = new Date(
    `${bookingInfo.date}T${bookingInfo.endTime}`
  ).getTime();

  const calculateHours = (endDateTime - startDateTime) / (1000 * 60 * 60);

  return calculateHours * facility.pricePerHour;
};

// find availabe time slots
export const getAllAvailableSlots = (bookings: TBooking[]) => {
  const dailySlots = [
    {
      startTime: "08:00",
      endTime: "10:00",
    },
    {
      startTime: "10:00",
      endTime: "13:00",
    },
    {
      startTime: "14:00",
      endTime: "16:00",
    },
  ];

  bookings.forEach((booking) => {
    dailySlots.forEach((slot, index) => {
      if (
        booking.startTime <= slot.endTime &&
        booking.endTime >= slot.startTime
      ) {
        dailySlots.splice(index, 1);
      }
    });
  });

  return dailySlots;
};
