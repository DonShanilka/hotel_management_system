import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getAllRoom, saveRooms, updateRoom } from "../../reducer/RoomSlice.ts";
import { LayoutGrid, Plus, Search } from "lucide-react";

const RoomAddForm: React.FC = () => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const rooms = useSelector((state: any) => state.rooms || []);

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "Single",
    image: null,
    hallFloor: 0,
    price: "",
    status: "Available",
  });

  useEffect(() => {
    dispatch(getAllRoom())
  }, [dispatch])

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      formData.roomNumber &&
      formData.roomType &&
      formData.status &&
      formData.hallFloor &&
      formData.price
    ) {
      const roomData = new FormData();
      roomData.append("roomNumber", formData.roomNumber);
      roomData.append("roomType", formData.roomType);
      roomData.append("status", formData.status);
      roomData.append("hallFloor", formData.hallFloor.toString());
      roomData.append("price", formData.price);

      if (formData.image) {
        roomData.append("image", formData.image);
      }

      const roomNumber = Number(formData.roomNumber);

      if (editIndex !== null) {
        roomData.append("roomNumber", roomNumber.toString());
        dispatch(updateRoom(roomData));
        setEditIndex(null);
      } else {
        dispatch(saveRooms(roomData));
      }

      setFormData({
        roomNumber: "",
        roomType: "Single",
        image: null,
        hallFloor: 0,
        price: "",
        status: "Available"
      });
    } else {
      alert("Please fill all fields.");
    }
  };


  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
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

  const handleDelete = (roomNumber: string) => {
    const isConfirm = window.confirm("Are you sure want to delete Room ?");
    if (isConfirm) {
      dispatch(deleteRoom(roomNumber))
    } else {
      alert("Delete Failed, try again!")
    }
  };

  const handleUpdate = (index: number, room: any) => {
    if (!room) {
      console.error("Room data is undefined for index:", index);
      return;
    }

    setEditIndex(index);
    const hallFloor = Number(room.hallFloor);

    setFormData({
      roomNumber: room.roomNumber || "",
      roomType: room.roomType || "Single",
      image: null,
      hallFloor: hallFloor || 0,
      price: room.price || "",
      status: room.status || "Available",
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Room Management
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100">MODULAR</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Filter rooms..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Plus size={14} className="text-teal-500" /> {editIndex !== null ? "Edit Resource" : "Register New Room"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="e.g. 101"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Room Type</label>
              <select
                value={formData.roomType}
                name="roomType"
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Room Image</label>
              <input
                className="w-full p-1.5 border border-slate-200 rounded-lg text-[10px] file:mr-2 file:py-0.5 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200"
                type="file"
                name='image'
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Hall Floor</label>
              <input
                type="number"
                name="hallFloor"
                value={formData.hallFloor}
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Status</label>
              <select
                value={formData.status}
                name="status"
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className={`px-8 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${editIndex !== null
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
            >
              {editIndex !== null ? "Update Asset" : "Deploy Room"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <LayoutGrid size={14} className="text-teal-500" /> Active Inventory
        </h2>
        <RoomCard rooms={rooms || []} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default RoomAddForm;
