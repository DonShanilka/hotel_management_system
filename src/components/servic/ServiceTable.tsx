import React from 'react';

interface ServiceTableProps {
  services: any[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services, onDelete, onUpdate }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Service List</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className=" p-2">ID</th>
            <th className=" p-2">Name</th>
            <th className=" p-2">Price</th>
            <th className=" p-2">Description</th>
            <th className=" p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index} className="text-center">
              <td className=" p-2">{service.serviceID}</td>
              <td className=" p-2">{service.serviceName}</td>
              <td className=" p-2">${service.servicePrice}</td>
              <td className=" p-2">{service.description}</td>
              <td className=" p-2 flex justify-center gap-2">
                <button onClick={() => onUpdate(index, service.serviceID)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => onDelete(service.serviceID)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
