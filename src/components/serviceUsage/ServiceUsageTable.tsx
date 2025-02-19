import React from 'react';

interface ServiceUsageTableProps {
  serviceUsages: any[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const ServiceUsageTable: React.FC<ServiceUsageTableProps> = ({ serviceUsages, onDelete, onUpdate }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Service Usage List</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Usage ID</th>
            <th className="border p-2">Booking ID</th>
            <th className="border p-2">Guest ID</th>
            <th className="border p-2">Service ID</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total Cost</th>
            <th className="border p-2">Usage Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceUsages.map((usage, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{usage.usageID}</td>
              <td className="border p-2">{usage.bookingID}</td>
              <td className="border p-2">{usage.guestId}</td>
              <td className="border p-2">{usage.serviceID}</td>
              <td className="border p-2">{usage.quantity}</td>
              <td className="border p-2">${usage.totalCost}</td>
              <td className="border p-2">{usage.usageDate}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button onClick={() => onUpdate(index)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => onDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceUsageTable;
