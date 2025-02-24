import React from "react";

type PaymentEntry = {
  paymentId: number;
  roomNumber: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  totalNight: number;
  roomPerNight: number;
  additionalCharges: number;
  paymentMethod: string;
  cashReceive: number;
};

interface PaymentTableProps {
  paymentList: PaymentEntry[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
                                                     paymentList,
                                                     onDelete,
                                                     onUpdate,
                                                   }) => {
  return (
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Records</h2>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3 text-left">Payment ID</th>
            <th className="p-3 text-left">Room Number</th>
            <th className="p-3 text-left">Guest Name</th>
            <th className="p-3 text-left">Check-In Date</th>
            <th className="p-3 text-left">Check-Out Date</th>
            <th className="p-3 text-left">Total Nights</th>
            <th className="p-3 text-left">Room Per Night</th>
            <th className="p-3 text-left">Additional Charges</th>
            <th className="p-3 text-left">Payment Method</th>
            <th className="p-3 text-left">Cash Received</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
          </thead>
          <tbody>
          {paymentList.length > 0 ? (
              paymentList.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition duration-300">
                    <td className="p-3 text-gray-700">{payment.paymentId}</td>
                    <td className="p-3 text-gray-700">{payment.roomNumber}</td>
                    <td className="p-3 text-gray-700">{payment.guestName}</td>
                    <td className="p-3 text-gray-700">{payment.checkInDate}</td>
                    <td className="p-3 text-gray-700">{payment.checkOutDate}</td>
                    <td className="p-3 text-gray-700">{payment.totalNight}</td>
                    <td className="p-3 text-gray-700">${payment.roomPerNight}</td>
                    <td className="p-3 text-gray-700">${payment.additionalCharges}</td>
                    <td className="p-3 text-gray-700">{payment.paymentMethod}</td>
                    <td className="p-3 text-gray-700">${payment.cashReceive}</td>
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
                <td colSpan={11} className="p-4 text-center text-gray-500 bg-gray-50">
                  No payment records available.
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default PaymentTable;
