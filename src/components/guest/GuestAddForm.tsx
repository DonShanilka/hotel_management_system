import React, { useEffect, useState } from 'react';
import GuestTable from './GuestTable';
import { useDispatch, useSelector } from 'react-redux';
import { deteleGuest, getallGuest, saveGuest, updateGuest } from '../../reducer/GuestSlice';
import { getAllRoom } from "../../reducer/RoomSlice.ts";
import { UserPlus, Search, Users } from "lucide-react";

const GuestAddForm: React.FC = () => {
  const [guestId, setGuestId] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [nation, setNation] = useState("Local");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const guests = useSelector((state: any) => state.guests || []);
  const rooms = useSelector((state: any) => state.rooms || []);

  useEffect(() => {
    dispatch(getallGuest());
    dispatch(getAllRoom());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const guestData = {
      guestId,
      guestName,
      contactNumber,
      email,
      roomNumber,
      checkInDate,
      checkOutDate,
      nation
    };

    if (editIndex !== null) {
      dispatch(updateGuest(guestData));
      setEditIndex(null);
    } else {
      dispatch(saveGuest(guestData));
    }

    setGuestId('');
    setGuestName('');
    setContactNumber('');
    setEmail('');
    setRoomNumber('');
    setCheckInDate('');
    setCheckOutDate('');
    setNation("Local");
  };

  const handleDelete = (guId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete Guest ?");
    if (isConfirm) {
      dispatch(deteleGuest(guId))
    }
  };

  const handleUpdate = (index: number, guestID: string) => {
    const guestToUpdate = guests?.find((gu: any) => gu.guestId === guestID);

    if (!guestToUpdate) {
      console.error("Guest not found for ID:", guestID);
      return;
    }

    setGuestId(guestToUpdate.guestId);
    setGuestName(guestToUpdate.guestName);
    setContactNumber(guestToUpdate.contactNumber);
    setEmail(guestToUpdate.email);
    setRoomNumber(guestToUpdate.roomNumber);
    setCheckInDate(guestToUpdate.checkInDate);
    setCheckOutDate(guestToUpdate.checkOutDate);
    setNation(guestToUpdate.nation);
    setEditIndex(index);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Guest Management
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100">IDENTITIES</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search guests..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <UserPlus size={14} className="text-teal-500" /> {editIndex !== null ? "Modify Profile" : "New Lifecycle Entry"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">NIC / Passport ID</label>
              <input
                type="text"
                value={guestId}
                onChange={(e) => setGuestId(e.target.value)}
                placeholder="Unique Identifier"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Full Legal Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="First Last"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Contact Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+00 (000) 000-0000"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Communication Channel (Email)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@mail.com"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Allocated Terminal (Room)</label>
              <select
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="">Select Resource</option>
                {rooms.map((room: any) => (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    Room {room.roomNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Arrival (Check-in)</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Departure (Check-out)</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Nationality</label>
              <select
                value={nation}
                onChange={(e) => setNation(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="Local">Local</option>
                <option value="Foreign">Foreign</option>
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
              {editIndex !== null ? "Update Identity" : "Authorize Guest"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Users size={14} className="text-teal-500" /> Active Roster
        </h2>
        <GuestTable guests={guests} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default GuestAddForm;
