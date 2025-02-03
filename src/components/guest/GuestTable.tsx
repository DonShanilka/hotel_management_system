import React from "react";

type Guest = {
  guestId: string;
  guestName: string;
  contactNumber: string;
  email: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  nation: string;
};

interface GuestTableProps {
  guests: Guest[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, onDelete, onUpdate }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Guest List</h2>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3 text-left">Guest ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Room</th>
            <th className="p-3 text-left">Check-In</th>
            <th className="p-3 text-left">Check-Out</th>
            <th className="p-3 text-left">Nation</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map((guest, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-300">
                <td className="p-3 text-gray-700">{guest.guestId}</td>
                <td className="p-3 text-gray-700">{guest.guestName}</td>
                <td className="p-3 text-gray-700">{guest.contactNumber}</td>
                <td className="p-3 text-gray-700">{guest.email}</td>
                <td className="p-3 text-gray-700">{guest.roomNumber}</td>
                <td className="p-3 text-gray-700">{guest.checkInDate}</td>
                <td className="p-3 text-gray-700">{guest.checkOutDate}</td>
                <td className="p-3 text-gray-700">{guest.nation}</td>
                <td className="p-3 text-center flex justify-center space-x-2">
                  <button
                    onClick={() => onUpdate(index)}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition shadow-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition shadow-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="p-4 text-center text-gray-500 bg-gray-50">
                No guests available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;
