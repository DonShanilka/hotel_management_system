import React, { useState } from 'react';
import ServiceUsageTable from './ServiceUsageTable';

const ServiceUsageAddForm: React.FC = () => {
  const [usageID, setUsageID] = useState('');
  const [bookingID, setBookingID] = useState('');
  const [guestId, setGuestId] = useState('');
  const [serviceID, setServiceID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [usageDate, setUsageDate] = useState('');
  const [serviceUsageList, setServiceUsageList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUsage = {
      usageID,
      bookingID,
      guestId,
      serviceID,
      quantity,
      totalCost,
      usageDate,
    };

    if (editIndex !== null) {
      const updatedList = [...serviceUsageList];
      updatedList[editIndex] = newUsage;
      setServiceUsageList(updatedList);
      setEditIndex(null);
    } else {
      setServiceUsageList([...serviceUsageList, newUsage]);
    }

    // Reset form
    setUsageID('');
    setBookingID('');
    setGuestId('');
    setServiceID('');
    setQuantity('');
    setTotalCost('');
    setUsageDate('');
  };

  const handleDelete = (index: number) => {
    setServiceUsageList(serviceUsageList.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number) => {
    const usageToUpdate = serviceUsageList[index];
    setUsageID(usageToUpdate.usageID);
    setBookingID(usageToUpdate.bookingID);
    setGuestId(usageToUpdate.guestId);
    setServiceID(usageToUpdate.serviceID);
    setQuantity(usageToUpdate.quantity);
    setTotalCost(usageToUpdate.totalCost);
    setUsageDate(usageToUpdate.usageDate);

    setEditIndex(index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Service Usage Form</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Usage ID</label>
            <input
              type="text"
              value={usageID}
              onChange={(e) => setUsageID(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Booking ID</label>
            <input
              type="text"
              value={bookingID}
              onChange={(e) => setBookingID(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Guest ID</label>
            <input
              type="text"
              value={guestId}
              onChange={(e) => setGuestId(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Service ID</label>
            <input
              type="text"
              value={serviceID}
              onChange={(e) => setServiceID(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Total Cost ($)</label>
            <input
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Usage Date</label>
            <input
              type="date"
              value={usageDate}
              onChange={(e) => setUsageDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
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
          {editIndex !== null ? "Update Usage" : "Add Usage"}
        </button>
      </form>

      <ServiceUsageTable serviceUsages={serviceUsageList} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default ServiceUsageAddForm;
