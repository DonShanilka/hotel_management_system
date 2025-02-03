import React, { useState } from 'react';

const GuestManagement: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestList, setGuestList] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newGuest = {
      guestName,
      contactNumber,
      email,
      roomNumber,
      checkInDate,
      checkOutDate,
    };

    setGuestList([...guestList, newGuest]);

    // Reset form after submission
    setGuestName('');
    setContactNumber('');
    setEmail('');
    setRoomNumber('');
    setCheckInDate('');
    setCheckOutDate('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Guest Management Form</h1>

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
            <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Guest
        </button>
      </form>

      {/* Display Guest List */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Guest List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guestList.map((guest, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <p><strong>Name:</strong> {guest.guestName}</p>
              <p><strong>Contact:</strong> {guest.contactNumber}</p>
              <p><strong>Email:</strong> {guest.email}</p>
              <p><strong>Room Number:</strong> {guest.roomNumber}</p>
              <p><strong>Check-in Date:</strong> {guest.checkInDate}</p>
              <p><strong>Check-out Date:</strong> {guest.checkOutDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestManagement;
