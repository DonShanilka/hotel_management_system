import React, { useEffect, useState } from 'react';
import ReservationTable from './ReservationTable';
import { useDispatch, useSelector } from 'react-redux';
import { deteleBooking, getallBooking, saveBooking, updateBooking } from '../../reducer/ReservationSlice';
import {getAllRoom} from "../../reducer/RoomSlice.ts";
import {getallGuest} from "../../reducer/GuestSlice.ts";

const ReservationAddForm: React.FC = () => {
  const [bookingID, setBookingID] = useState<number | null>(null);
  const [guestID, setGuestID] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalNight, setTotalNight] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState('Confirmed');
  const [createdAt, setCreatedAt] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.reservations || []);
  const rooms = useSelector((state)=>state.rooms || []);
  const guests = useSelector((state) => state.guests || []);

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
    setBookingStatus('Pending');
    setCreatedAt('');
  };

  const handleUpdate = (index: number, boId: string) => {
    console.log("Booking list:", booking); 
    console.log("Looking for BookingId:", boId);
  
    const report = booking?.find((bo: any) => bo.bookingID === boId);
  
    if (!report) {
      console.error("Booking not found for ID:", boId);
      return;
    }

    setBookingID(boId);
    setGuestID(report.guestID);
    setRoomNumber(report.roomNumber);
    setCheckInDate(report.checkInDate);
    setCheckOutDate(report.checkOutDate);
    setTotalAmount(report.totalAmount);
    setTotalNight(report.totalNight);
    setBookingStatus(report.bookingStatus);
    // setCreatedAt();
    // Set the index for editing
    setEditIndex(index);
  };

  const handleDelete = (boId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete Booking ?");
    if(isConfirm){
      dispatch(deteleBooking(boId))
    }else{
      alert("Delete Failed, try again!")
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservation Form</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Guest ID</label>
            <select
                // value={empId}
                onChange={(e) => setGuestID(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300"
                required
            >
              <option value="">Select Guest Id</option>
              {guests.map((guest : any) => (
                  <option key={guest.guestId} value={guest.guestId}>
                    {guest.guestId}
                  </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Room Number</label>
            <select
                // value={empId}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full p-2 border rounded-lg border-gray-300"
                required
            >
              <option value="">Select Room Number</option>
              {rooms.map((room : any) => (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    {room.roomNumber}
                  </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Check-in Date</label>
            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Check-out Date</label>
            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Total Amount</label>
            <input type="number" value={totalAmount || ''} onChange={(e) => setTotalAmount(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Total Nights</label>
            <input type="number" value={totalNight || ''} onChange={(e) => setTotalNight(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
        </div>
        <div>
            <label className="block text-gray-700 font-medium mb-1">Booking Status</label>
            <select value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="CheckedOut">CheckedOut</option>
            </select>
        </div>
        <button type="submit"
          className={`mt-4 w-full py-2 rounded-lg text-white transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}>
          {editIndex !== null ? 'Update Reservation' : 'Add Reservation'}
        </button>
      </form>
      <ReservationTable reservations={booking} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default ReservationAddForm;
