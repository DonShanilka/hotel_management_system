import React from 'react';

interface Reservation {
  bookingID: number;
  guestID: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  totalNight: number;
  bookingStatus: string;
  createdAt: string;
}

interface ReservationTableProps {
  reservations: Reservation[];
  onDelete: (bookingID: number) => void;
  onUpdate: (reservation: Reservation) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, onDelete, onUpdate }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservations</h1>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Booking ID</th>
            <th className="p-3">Guest ID</th>
            <th className="p-3">Room Number</th>
            <th className="p-3">Check-in Date</th>
            <th className="p-3">Check-out Date</th>
            <th className="p-3">Total Amount</th>
            <th className="p-3">Total Nights</th>
            <th className="p-3">Booking Status</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={reservation.bookingID} className="border-b">
              <td className="p-3 text-center">{reservation.bookingID}</td>
              <td className="p-3 text-center">{reservation.guestID}</td>
              <td className="p-3 text-center">{reservation.roomNumber}</td>
              <td className="p-3 text-center">{reservation.checkInDate}</td>
              <td className="p-3 text-center">{reservation.checkOutDate}</td>
              <td className="p-3 text-center">${reservation.totalAmount}</td>
              <td className="p-3 text-center">{reservation.totalNight}</td>
              <td className="p-3 text-center">{reservation.bookingStatus}</td>
              <td className="p-3 text-center">{new Date(reservation.createdAt).toLocaleDateString()}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => onUpdate(index, reservation.bookingID)}
                  className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(reservation.bookingID)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
