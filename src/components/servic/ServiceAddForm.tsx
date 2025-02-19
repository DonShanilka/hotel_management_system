import React, { useState } from 'react';
import ServiceTable from './ServiceTable';

const ServiceAddForm: React.FC = () => {
  const [serviceID, setServiceID] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [description, setDescription] = useState('');
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newService = {
      serviceID,
      serviceName,
      servicePrice,
      description,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      const updatedList = [...serviceList];
      updatedList[editIndex] = newService;
      setServiceList(updatedList);
      setEditIndex(null);
    } else {
      setServiceList([...serviceList, newService]);
    }

    // Reset form
    setServiceID('');
    setServiceName('');
    setServicePrice('');
    setDescription('');
  };

  const handleDelete = (index: number) => {
    setServiceList(serviceList.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number) => {
    const serviceToUpdate = serviceList[index];
    setServiceID(serviceToUpdate.serviceID);
    setServiceName(serviceToUpdate.serviceName);
    setServicePrice(serviceToUpdate.servicePrice);
    setDescription(serviceToUpdate.description);

    setEditIndex(index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Service Management Form</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">Service ID</label>
            <input
              type="text"
              value={serviceID}
              onChange={(e) => setServiceID(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div> */}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Service Name</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Service Price ($)</label>
            <input
              type="number"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-28 p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`mt-4 w-full text-white py-2 rounded-lg transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editIndex !== null ? "Update Service" : "Add Service"}
        </button>
      </form>

      <ServiceTable services={serviceList} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default ServiceAddForm;
