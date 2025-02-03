import React, { useState } from 'react';
import HousekeepingTable from './HousekeepingTable';

const HousekeepingAddForm: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [cleaningDate, setCleaningDate] = useState('');
  const [status, setStatus] = useState('Not Cleaned');
  const [specialTasks, setSpecialTasks] = useState('');
  const [housekeepingList, setHousekeepingList] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHousekeeping = {
      roomNumber,
      cleaningDate,
      status,
      specialTasks,
    };

    // Reset form after submission
    setRoomNumber('');
    setCleaningDate('');
    setStatus('Not Cleaned');
    setSpecialTasks('');
  };

  const handleDelete = (index: number) => {
    setHousekeepingList(housekeepingList.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number) => {
    const entry = housekeepingList[index];
    setRoomNumber(entry.roomNumber);
    setCleaningDate(entry.cleaningDate);
    setStatus(entry.status);
    setSpecialTasks(entry.specialTasks);
    handleDelete(index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Housekeeping Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Room Number</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Cleaning Date</label>
            <input
              type="date"
              value={cleaningDate}
              onChange={(e) => setCleaningDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="Not Cleaned">Not Cleaned</option>
              <option value="Cleaned">Cleaned</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Special Tasks</label>
            <textarea
              value={specialTasks}
              onChange={(e) => setSpecialTasks(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Any special tasks (e.g. restock minibar, change sheets)"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Housekeeping Status
        </button>
      </form>

      <HousekeepingTable
        housekeepingList={housekeepingList}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default HousekeepingAddForm;
