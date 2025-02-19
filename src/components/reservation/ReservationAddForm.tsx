import React, { useState } from 'react';
import ReservationTable from './ReservationTable';
import { useDispatch } from 'react-redux';

const ReservationAddForm: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [mobile, setMobile] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [reservationList, setReservationList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const dispatch = useDispatch();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReservation = {
      guestName,
      roomNumber,
      checkInDate,
      checkOutDate,
      paymentMethod,
      mobile,
    };

    if (editIndex !== null) {
      const updatedList = [...reservationList];
      updatedList[editIndex] = newReservation;
      setReservationList(updatedList);
      setEditIndex(null);
    } else {
      // setReservationList([...reservationList, newReservation]);

    }

    // Reset form
    setGuestName('');
    setRoomNumber('');
    setCheckInDate('');
    setCheckOutDate('');
    setPaymentMethod('Credit Card');
    setMobile('');
  };

  const handleDelete = (index: number) => {
    setReservationList(reservationList.filter((_, i) => i !== index));
  };

  const updateReservation = (index: number) => {
  
    const updatedList = reservationList[index];
  
    setGuestName(updatedList.guestName);
    setRoomNumber(updatedList.roomNumber);
    setCheckInDate(updatedList.checkInDate);
    setCheckOutDate(updatedList.checkOutDate);
    setPaymentMethod(updatedList.paymentMethod);
    setMobile(updatedList.mobile);
    setEditIndex(index);
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservation Form</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Guest Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

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
            <label className="block text-gray-700 font-medium mb-1">Check-in Date</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Check-out Date</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editIndex !== null ? "Update Reservations" : "Add Reservations"}
        </button>
      </form>
      <ReservationTable reservations={reservationList} onDelete={handleDelete} onUpdate={updateReservation}/>
    </div>
  );
};

export default ReservationAddForm;
