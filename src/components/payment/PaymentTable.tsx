import React from "react";

type PaymentEntry = {
  paymentMethod: string;
  amount: number;
  custId: string;
  cash: number;
  balance: number;
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
            <th className="p-3 text-left">Guest ID</th>
            <th className="p-3 text-left">Payment Method</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Cash</th>
            <th className="p-3 text-left">Balance</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentList.length > 0 ? (
            paymentList.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-300">
                <td className="p-3 text-gray-700">{payment.custId}</td>
                <td className="p-3 text-gray-700">{payment.paymentMethod}</td>
                <td className="p-3 text-gray-700">${payment.amount}</td>
                <td className="p-3 text-gray-700">${payment.cash}</td>
                <td className="p-3 text-gray-700">${payment.balance}</td>
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
              <td colSpan={5} className="p-4 text-center text-gray-500 bg-gray-50">
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