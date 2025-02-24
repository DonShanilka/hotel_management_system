import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoom } from "../../reducer/RoomSlice.ts";

const PaymentAddForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms || []);

  useEffect(() => {
    dispatch(getAllRoom());
  }, [dispatch]);

  const [paymentDetails, setPaymentDetails] = useState({
    guestId: "",
    roomNumber: "",
    guestName: "",
    checkInDate: "",
    checkOutDate: "",
    totalNight: "",
    roomPerNight: "",
    additionalCharges: "",
    paymentMethod: "",
    cashReceived: "",
    createdAt: "",
    bookingBookingID: "",
  });

  // Calculate total amount
  const total =
      (parseFloat(paymentDetails.totalNight) || 0) *
      (parseFloat(paymentDetails.roomPerNight) || 0) +
      (parseFloat(paymentDetails.additionalCharges) || 0);

  // Calculate balance: cash received minus total
  const balance = (parseFloat(paymentDetails.cashReceived) || 0) - total;

  const handleSave = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
        paymentDetails.guestId &&
        paymentDetails.roomNumber &&
        paymentDetails.guestName &&
        paymentDetails.checkInDate &&
        paymentDetails.checkOutDate &&
        paymentDetails.totalNight &&
        paymentDetails.roomPerNight &&
        paymentDetails.additionalCharges &&
        paymentDetails.paymentMethod &&
        paymentDetails.cashReceived &&
        paymentDetails.createdAt &&
        paymentDetails.bookingBookingID
    ) {
      // Here you would typically dispatch an action or call an API to save paymentDetails

      // Reset the form
      setPaymentDetails({
        guestId: "",
        roomNumber: "",
        guestName: "",
        checkInDate: "",
        checkOutDate: "",
        totalNight: "",
        roomPerNight: "",
        additionalCharges: "",
        paymentMethod: "",
        cashReceived: "",
        createdAt: "",
        bookingBookingID: "",
      });
      setIsModalOpen(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
      <div className="w-full bg-amber-200 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Bill Payment</h1>
        <div className="flex justify-end">
          <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
          >
            Open Payment Form
          </button>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black/75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-2xl">
                <h2 className="text-xl font-bold mb-4">Bill Payment Form</h2>
                <form className="space-y-4">
                  {/* Guest Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Guest ID</label>
                      <input
                          type="text"
                          name="guestId"
                          className="w-full p-2 border rounded"
                          value={paymentDetails.guestId}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                guestId: e.target.value,
                              })
                          }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Room Number</label>
                      <select
                          name="roomNumber"
                          className="w-full p-2 border rounded"
                          value={paymentDetails.roomNumber}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                roomNumber: e.target.value,
                              })
                          }
                          required
                      >
                        <option value="">Select Room Number</option>
                        {rooms.map((room: any) => (
                            <option key={room.roomNumber} value={room.roomNumber}>
                              {room.roomNumber}
                            </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Guest Name</label>
                      <input
                          type="text"
                          name="guestName"
                          className="w-full p-2 border rounded"
                          value={paymentDetails.guestName}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                guestName: e.target.value,
                              })
                          }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Booking ID</label>
                      <input
                          type="number"
                          name="bookingBookingID"
                          className="w-full p-2 border rounded"
                          value={paymentDetails.bookingBookingID}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                bookingBookingID: e.target.value,
                              })
                          }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Check-In Date</label>
                      <input
                          type="date"
                          name="checkInDate"
                          required
                          className="w-full p-2 border rounded"
                          value={paymentDetails.checkInDate}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                checkInDate: e.target.value,
                              })
                          }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Check-Out Date</label>
                      <input
                          type="date"
                          name="checkOutDate"
                          required
                          className="w-full p-2 border rounded"
                          value={paymentDetails.checkOutDate}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                checkOutDate: e.target.value,
                              })
                          }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Total Nights</label>
                      <input
                          type="number"
                          name="totalNight"
                          required
                          className="w-full p-2 border rounded"
                          value={paymentDetails.totalNight}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                totalNight: e.target.value,
                              })
                          }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Room Per Night</label>
                      <input
                          type="number"
                          name="roomPerNight"
                          required
                          className="w-full p-2 border rounded"
                          value={paymentDetails.roomPerNight}
                          onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                roomPerNight: e.target.value,
                              })
                          }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Additional Charges</label>
                    <input
                        type="number"
                        name="additionalCharges"
                        required
                        className="w-full p-2 border rounded"
                        value={paymentDetails.additionalCharges}
                        onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              additionalCharges: e.target.value,
                            })
                        }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Payment Method</label>
                    <select
                        name="paymentMethod"
                        className="w-full p-2 border rounded"
                        value={paymentDetails.paymentMethod}
                        onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              paymentMethod: e.target.value,
                            })
                        }
                    >
                      <option value="">Select Payment Method</option>
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                      <option value="cash">Cash</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Cash Received</label>
                    <input
                        type="number"
                        name="cashReceived"
                        required
                        className="w-full p-2 border rounded"
                        value={paymentDetails.cashReceived}
                        onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cashReceived: e.target.value,
                            })
                        }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Created At</label>
                    <input
                        type="date"
                        name="createdAt"
                        required
                        className="w-full p-2 border rounded"
                        value={paymentDetails.createdAt}
                        onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              createdAt: e.target.value,
                            })
                        }
                    />
                  </div>

                  {/* Total and Balance Display */}
                  <div className="text-left text-lg font-bold">
                    Total: ${total.toFixed(2)}
                  </div>
                  <div
                      className={`text-left text-lg font-bold ${
                          balance < 0 ? "text-red-500" : "text-green-600"
                      }`}
                  >
                    Balance: ${balance.toFixed(2)}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleSave}
                    >
                      Submit Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default PaymentAddForm;
