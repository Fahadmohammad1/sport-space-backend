"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAvailableSlots = exports.calculatePayableAmount = void 0;
const calculatePayableAmount = (bookingInfo, facility) => {
    const startDateTime = new Date(`${bookingInfo.date}T${bookingInfo.startTime}`).getTime();
    const endDateTime = new Date(`${bookingInfo.date}T${bookingInfo.endTime}`).getTime();
    const calculateHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    return calculateHours * facility.pricePerHour;
};
exports.calculatePayableAmount = calculatePayableAmount;
// find availabe time slots
const getAllAvailableSlots = (bookings) => {
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
            if (booking.startTime <= slot.endTime &&
                booking.endTime >= slot.startTime) {
                dailySlots.splice(index, 1);
            }
        });
    });
    return dailySlots;
};
exports.getAllAvailableSlots = getAllAvailableSlots;
