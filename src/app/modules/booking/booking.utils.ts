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
