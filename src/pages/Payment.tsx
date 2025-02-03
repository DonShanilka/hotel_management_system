import React, { useState } from 'react';

const Payment: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [amount, setAmount] = useState(0);
  const [custId, setCustId] = useState('');
  const [cash, setChash] = useState(0);
  const [paymentList, setPaymentList] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPayment = {
      paymentMethod,
      amount,
      custId,
      cash
    };

    setPaymentList([...paymentList, newPayment]);

    // Reset form after submission
    setPaymentMethod('Credit Card');
    setAmount(0);
    setChash(0);
    setCustId('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Payment</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-gray-700 font-medium mb-1">Guest ID</label>
            <input
              type="text"
              value={custId}
              onChange={(e) => setCustId(e.target.value)}
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
              {/* <option value="PayPal">PayPal</option> */}
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Cash</label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setChash(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Process Payment
        </button>
      </form>

      {/* Display Processed Payments */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Processed Payments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentList.map((payment, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Payment Date:</strong> {payment.paymentDate}</p>
              {/* <p><strong>Notification:</strong> {payment.notification || 'No notification'}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
