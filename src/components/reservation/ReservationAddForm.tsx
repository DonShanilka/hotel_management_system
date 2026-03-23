import React, { useEffect, useState } from 'react';
import ReservationTable from './ReservationTable';
import { useDispatch, useSelector } from 'react-redux';
import { deteleBooking, getallBooking, saveBooking, updateBooking } from '../../reducer/ReservationSlice';
import { getAllRoom } from "../../reducer/RoomSlice.ts";
import { getallGuest } from "../../reducer/GuestSlice.ts";
import { Calendar, Plus, Search, ClipboardList } from "lucide-react";

const ReservationAddForm: React.FC = () => {
  const [bookingID, setBookingID] = useState<number | null>(null);
  const [guestID, setGuestID] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalNight, setTotalNight] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState('Confirmed');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const booking = useSelector((state: any) => state.reservations || []);
  const rooms = useSelector((state: any) => state.rooms || []);
  const guests = useSelector((state: any) => state.guests || []);

  useEffect(() => {
    dispatch(getallBooking());
    dispatch(getAllRoom());
    dispatch(getallGuest());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation = {
      guestID,
      roomNumber,
      checkInDate,
      checkOutDate,
      totalAmount,
      totalNight,
      bookingStatus,
      createdAt: new Date().toISOString(),
    };

    const updateData = {
      bookingID,
      guestID,
      roomNumber,
      checkInDate,
      checkOutDate,
      totalAmount,
      totalNight,
      bookingStatus,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      dispatch(updateBooking(updateData));
      setEditIndex(null);
    } else {
      dispatch(saveBooking(newReservation));
      alert('Booking Saved Successfully');
    }

    setBookingID(null);
    setGuestID('');
    setRoomNumber('');
    setCheckInDate('');
    setCheckOutDate('');
    setTotalAmount(null);
    setTotalNight(null);
    setBookingStatus('Confirmed');
  };

  const handleUpdate = (index: number, boId: string) => {
    const report = booking?.find((bo: any) => bo.bookingID === boId);

    if (!report) {
      console.error("Booking not found for ID:", boId);
      return;
    }

    setBookingID(Number(boId));
    setGuestID(report.guestID);
    setRoomNumber(report.roomNumber);
    setCheckInDate(report.checkInDate);
    setCheckOutDate(report.checkOutDate);
    setTotalAmount(report.totalAmount);
    setTotalNight(report.totalNight);
    setBookingStatus(report.bookingStatus);
    setEditIndex(index);
  };

  const handleDelete = (boId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete Booking ?");
    if (isConfirm) {
      dispatch(deteleBooking(boId))
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Reservation Management
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100">OPERATIONAL</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search reservations..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Calendar size={14} className="text-teal-500" /> {editIndex !== null ? "Modify Allocation" : "New Booking Entry"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Guest Identity</label>
              <select
                value={guestID}
                onChange={(e) => setGuestID(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="">Select Guest</option>
                {guests.map((guest: any) => (
                  <option key={guest.guestId} value={guest.guestId}>
                    {guest.guestId} - {guest.firstName} {guest.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Room Allocation</label>
              <select
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="">Select Room</option>
                {rooms.map((room: any) => (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    Room {room.roomNumber} ({room.roomType})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Check-in Date</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Check-out Date</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Total Value ($)</label>
              <input
                type="number"
                value={totalAmount || ''}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                placeholder="0.00"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Duration (Nights)</label>
              <input
                type="number"
                value={totalNight || ''}
                onChange={(e) => setTotalNight(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 lg:col-span-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Engagement Status</label>
              <select
                value={bookingStatus}
                onChange={(e) => setBookingStatus(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="CheckedOut">Checked Out</option>
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
              {editIndex !== null ? 'Update Reservation' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <ClipboardList size={14} className="text-teal-500" /> Active Reservations
        </h2>
        <ReservationTable reservations={booking} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ReservationAddForm;
