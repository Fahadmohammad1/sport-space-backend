"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayableAmount = void 0;
const calculatePayableAmount = (bookingInfo, facility) => {
    const startDateTime = new Date(`${bookingInfo.date}T${bookingInfo.startTime}`).getTime();
    const endDateTime = new Date(`${bookingInfo.date}T${bookingInfo.endTime}`).getTime();
    const calculateHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    return calculateHours * facility.pricePerHour;
};
exports.calculatePayableAmount = calculatePayableAmount;
