export class Reservation {
  bookingID !: number;
  guestId !: string;
  roomNumber !: string;
  checkInDate !: string;
  checkOutDate !: string;
  totalNight !: number;
  roomPerNight !: number;
  additionalCharges !: number;
  paymentMethod !: string;
  cashReceive !: number;
}
