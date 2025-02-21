import React, { useState } from 'react';

interface Reservation {
  bookingID: number;
  guestName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
}

interface ReservationTableProps {
  reservations: Reservation[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({reservations, onDelete, onUpdate}) => {
  // console.log("Booking Data For Table: ", reservations)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservations</h1>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Booking Id</th>
            <th className="p-3">Guest Name</th>
            <th className="p-3">Room Number</th>
            <th className="p-3">Check-in Date</th>
            <th className="p-3">Check-out Date</th>
            <th className="p-3">Payment Method</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{reservation.bookingID}</td>
              <td className="p-3">{reservation.guestName}</td>
              <td className="p-3">{reservation.roomNumber}</td>
              <td className="p-3">{reservation.checkInDate}</td>
              <td className="p-3">{reservation.checkOutDate}</td>
              <td className="p-3">{reservation.paymentMethod}</td>
              <td className="p-3">
                <button
                  onClick={() => onUpdate(index)}
                  className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(index)}
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
