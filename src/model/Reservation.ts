export class Reservation {
  reservationId !: string;
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
