import React, { useState } from 'react';
import RoomCard from './RoomCard';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {saveRooms} from "../../reducer/RoomSlice.ts";

// type Room = {
//   roomNumber: string;
//   roomType: string;
//   selectedImage: string | null; // Fixed: Added selectedImage in Room type
//   hallFloor: string;
//   price: number;
//   status: string;
// };

const RoomAddForm: React.FC = () => {
  // const [roomNumber, setRoomNumber] = useState('');
  // const [roomType, setRoomType] = useState('Single');
  // const [image, setSelectedImage] = useState<string | null>(null);
  // const [hallFloor, setHallFloor] = useState('');
  // const [price, setPrice] = useState(0);
  // const [status, setStatus] = useState('Available');
  // const [roomList, setRoomList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const rooms = useSelector((state)=>state.rooms || []);

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    image: null,
    hallFloor: "",
    price: "",
    status: "",
  });

  const handleSubmit =  (e) => {
    e.preventDefault();

    if (
        formData.roomNumber &&
        formData.roomType &&
        formData.status &&
        formData.hallFloor &&
        formData.price
    ){
      const roomData = new FormData();
      roomData.append("roomNumber", formData.roomNumber);
      roomData.append("roomType", formData.roomType);
      roomData.append("status", formData.status);
      roomData.append("hallFloor", formData.hallFloor);
      roomData.append("price", formData.price);

      if (formData.image){
        roomData.append("image", formData.image);
      }
      console.log("Awa")
      dispatch(saveRooms(roomData));
    }else {
      alert("Please fill all fields.");
    }
  };

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0],
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDelete = (index: number) => {
    // const updatedList = roomList.filter((_, i) => i !== index);
    // setRoomList(updatedList);
  };

  const handleUpdate = (index: number) => {
    // const room = roomList[index];
    // setRoomNumber(room.roomNumber);
    // setRoomType(room.roomType);
    // setSelectedImage(room.selectedImage);
    // setHallFloor(room.hallFloor);
    // setPrice(room.price);
    // setStatus(room.status);
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
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Room Type</label>
            <select
              value={formData.roomType}
              name= "roomType"
              onChange={handleChange}
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
              name='image'
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Hall Floor</label>
            <input
              type="text"
              name={"hallFloor"}
              value={formData.hallFloor}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              value={formData.status}
              name={"status"}
              onChange={handleChange}
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
      <RoomCard rooms={rooms || []} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default RoomAddForm;
