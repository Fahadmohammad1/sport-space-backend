export type TBookingStatus = "confirmed" | "unconfirmed" | "other";

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  facility: string;
  payableAmount: number;
  isBooked: TBookingStatus;
};
