import React, { useState } from 'react';
import RoomCard from './RoomCard';

type Room = {
  roomNumber: string;
  roomType: string;
  selectedImage: string | null; // Fixed: Added selectedImage in Room type
  hallFloor: string;
  price: number;
  status: string;
};

const RoomAddForm: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('Single');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hallFloor, setHallFloor] = useState('');
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState('Available');
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRoom: Room = {
      roomNumber,
      roomType,
      selectedImage, // Fixed: Store selected image properly
      hallFloor,
      price,
      status,
    };

    setRooms([...rooms, newRoom]);

    // Reset Form
    setRoomNumber('');
    setRoomType('Single');
    setHallFloor('');
    setPrice(0);
    setStatus('Available');
    setSelectedImage(null); // Reset image selection
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Fixed: Added optional chaining to prevent errors
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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

          {/* Image Chooser */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Room Image</label>
            <input
              className="w-full p-2 border rounded-lg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
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
      <RoomCard rooms= {rooms}/>
    </div>
  );
};

export default RoomAddForm;
