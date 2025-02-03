import React, { useState } from 'react';

type Room = {
  roomNumber: string;
  roomType: string;
  acType: string;
  hallFloor: string;
  price: number;
  status: string;
};

const RoomAddForm: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('Single');
  const [acType, setAcType] = useState('AC');
  const [hallFloor, setHallFloor] = useState('');
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState('Available');
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRoom: Room = {
      roomNumber,
      roomType,
      acType,
      hallFloor,
      price,
      status,
    };

    setRooms([...rooms, newRoom]);

    setRoomNumber('');
    setRoomType('Single');
    setAcType('AC');
    setHallFloor('');
    setPrice(0);
    setStatus('Available');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-h-screen overflow-hidden">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Room Management</h1>

      {/* Room Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <label className="block text-gray-700 font-medium mb-1">Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">AC Type</label>
            <select
              value={acType}
              onChange={(e) => setAcType(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Hall Floor</label>
            <input
              type="text"
              value={hallFloor}
              onChange={(e) => setHallFloor(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
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
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Room
        </button>
      </form>

      {/* Display Room Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {rooms.map((room, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Room {room.roomNumber}</h2>
            <p className="text-gray-600"><strong>Type:</strong> {room.roomType}</p>
            <p className="text-gray-600"><strong>AC:</strong> {room.acType}</p>
            <p className="text-gray-600"><strong>Hall Floor:</strong> {room.hallFloor}</p>
            <p className="text-gray-600"><strong>Price:</strong> ${room.price}</p>
            <p className="text-gray-600"><strong>Status:</strong> {room.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAddForm;
