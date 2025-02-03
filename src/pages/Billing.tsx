import React, { useState } from 'react';

const Billing: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [amountDue, setAmountDue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [billingDate, setBillingDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const billingData = {
      guestName,
      roomNumber,
      amountDue,
      paymentMethod,
      billingDate,
      paymentStatus,
    };

    console.log('Billing Created:', billingData);

    // Reset form after submission
    setGuestName('');
    setRoomNumber('');
    setAmountDue(0);
    setPaymentMethod('Credit Card');
    setBillingDate('');
    setPaymentStatus('Unpaid');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Billing Form</h1>

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
            <label className="block text-gray-700 font-medium mb-1">Amount Due ($)</label>
            <input
              type="number"
              value={amountDue}
              onChange={(e) => setAmountDue(parseFloat(e.target.value))}
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
            <label className="block text-gray-700 font-medium mb-1">Billing Date</label>
            <input
              type="date"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Billing
        </button>
      </form>
    </div>
  );
};

export default Billing;
