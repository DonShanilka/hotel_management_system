import React, { useEffect, useState } from 'react';
import ReservationTable from './ReservationTable';
import { useDispatch, useSelector } from 'react-redux';
import { getallBooking, saveBooking, updateBooking } from '../../reducer/ReservationSlice';

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

  useEffect(() => {
    dispatch(getallBooking());
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

    if (editIndex !== null) {
      dispatch(updateBooking(newReservation));
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
    console.log("Booking list:", booking); // Debugging line
    console.log("Looking for BookingId:", boId);
  
    const report = booking?.find((bo: any) => bo.bookingID === boId);
  
    if (!report) {
      console.error("Booking not found for ID:", boId);
      return;
    }

    // setBookingID(null);
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservation Form</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Guest ID</label>
            <input type="text" value={guestID} onChange={(e) => setGuestID(e.target.value)} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Room Number</label>
            <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Check-in Date</label>
            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Check-out Date</label>
            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Total Amount</label>
            <input type="number" value={totalAmount || ''} onChange={(e) => setTotalAmount(Number(e.target.value))} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Total Nights</label>
            <input type="number" value={totalNight || ''} onChange={(e) => setTotalNight(Number(e.target.value))} className="w-full p-2 border rounded-lg" required />
          </div>
        </div>
        <div>
            <label className="block text-gray-700 font-medium mb-1">Booking Status</label>
            <select value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)} className="w-full p-2 border rounded-lg">
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
      <ReservationTable reservations={booking} onDelete={() => {}} onUpdate={handleUpdate} />
    </div>
  );
};

export default ReservationAddForm;
