import React, { useState } from 'react';
import RoomCard from './RoomCard';
import axios from "axios";

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
  const [roomList, setRoomList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRoom : Room = {
      roomNumber,
      roomType,
      selectedImage, 
      hallFloor,
      price,
      status,
    };

    if (editIndex !== null) {
      // Update existing report
      const updatedList = [...roomList];
      updatedList[editIndex] = newRoom;
      setRoomList(updatedList);
      setEditIndex(null);
    } else {
      // Add new report
      setRoomList([...roomList, newRoom]);
    }

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

  const handleDelete = (index: number) => {
    const updatedList = roomList.filter((_, i) => i !== index);
    setRoomList(updatedList);
  };

  const handleUpdate = (index: number) => {
    const room = roomList[index];
    setRoomNumber(room.roomNumber);
    setRoomType(room.roomType);
    setSelectedImage(room.selectedImage);
    setHallFloor(room.hallFloor);
    setPrice(room.price);
    setStatus(room.status);
    setEditIndex(index);
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
          className={`mt-4 w-full py-2 rounded-lg text-white transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editIndex !== null ? "Update Room" : "Add Room"}
        </button>
      </form>
      <RoomCard rooms = {roomList} onUpdate={handleUpdate} onDelete={handleDelete}/>
    </div>
  );
};

export default RoomAddForm;
