import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoom } from "../../reducer/RoomSlice.ts";
import { deletePayment, getAllPayment, savePayment } from "../../reducer/PaymentSlice.ts";
import { getallGuest } from "../../reducer/GuestSlice.ts";
import { getallBooking } from "../../reducer/ReservationSlice.ts";
import PaymentTable from "./PaymentTable.tsx";
import { Receipt, Search, Plus, X } from "lucide-react";

const PaymentAddForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const rooms = useSelector((state: any) => state.rooms || []);
  const payment = useSelector((state: any) => state.payment || []);
  const guests = useSelector((state: any) => state.guests || []);
  const reservations = useSelector((state: any) => state.reservations || []);

  useEffect(() => {
    dispatch(getAllRoom());
    dispatch(getAllPayment());
    dispatch(getallGuest());
    dispatch(getallBooking());
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
    totalPayment: "",
    cashReceive: "",
    createdAt: "",
    bookingBookingID: "",
  });

  // Auto-fill logic
  useEffect(() => {
    if (paymentDetails.guestId.trim() !== "") {
      const guest = guests.find((g: any) => g.guestId === paymentDetails.guestId);
      const reservation = reservations.find((r: any) => r.guestId === paymentDetails.guestId);

      if (guest || reservation) {
        const update: any = {};
        if (guest) {
          update.guestName = guest.guestName;
        }
        if (reservation) {
          update.bookingBookingID = reservation.bookingID?.toString() || "";
          update.roomNumber = reservation.roomNumber || "";
          update.checkInDate = reservation.checkInDate ? reservation.checkInDate.split("T")[0] : "";
          update.checkOutDate = reservation.checkOutDate ? reservation.checkOutDate.split("T")[0] : "";
          update.totalNight = reservation.totalNight?.toString() || "";
          update.roomPerNight = reservation.roomPerNight?.toString() || "";
          update.additionalCharges = reservation.additionalCharges?.toString() || "0";
          update.paymentMethod = reservation.paymentMethod || "";
          update.cashReceive = reservation.cashReceive?.toString() || "0";
          update.createdAt = new Date().toISOString().split("T")[0];
        }
        setPaymentDetails(prev => ({ ...prev, ...update }));
      }
    }
  }, [paymentDetails.guestId, guests, reservations]);

  const total =
    (parseFloat(paymentDetails.totalNight) || 0) *
    (parseFloat(paymentDetails.roomPerNight) || 0) +
    (parseFloat(paymentDetails.additionalCharges) || 0);

  const balance = (parseFloat(paymentDetails.cashReceive) || 0) - total;

  const handleSave = (e: React.FormEvent) => {
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
      paymentDetails.cashReceive &&
      paymentDetails.createdAt &&
      paymentDetails.bookingBookingID
    ) {
      const formattedPayment = {
        ...paymentDetails,
        checkInDate: new Date(paymentDetails.checkInDate).toISOString(),
        checkOutDate: new Date(paymentDetails.checkOutDate).toISOString(),
        createdAt: new Date(paymentDetails.createdAt).toISOString(),
      };

      dispatch(savePayment(formattedPayment));

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
        totalPayment: "",
        cashReceive: "",
        createdAt: "",
        bookingBookingID: "",
      });

      setIsModalOpen(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDelete = (paymentId: number) => {
    const isConfirm = window.confirm("Are you sure want to delete Payment?");
    if (isConfirm) {
      dispatch(deletePayment(paymentId))
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Financial Operations
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100">SETTLEMENT</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search ledger..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-sm"
          >
            <Plus size={14} /> Initiate Billing
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Receipt size={14} className="text-teal-500" /> Transaction Ledger
        </h2>
        <PaymentTable paymentList={payment} onDelete={handleDelete} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg border border-slate-200 w-full max-w-3xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Receipt size={16} className="text-teal-500" /> Bill Processing Terminal
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Identity (Guest ID)</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.guestId}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, guestId: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Asset (Room)</label>
                  <select
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.roomNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, roomNumber: e.target.value })}
                    required
                  >
                    <option value="">Select Resource</option>
                    {rooms.map((room: any) => (
                      <option key={room.roomNumber} value={room.roomNumber}>Room {room.roomNumber}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Entity Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.guestName}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, guestName: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Check-In</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.checkInDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, checkInDate: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Check-Out</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.checkOutDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, checkOutDate: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Duration (Nights)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.totalNight}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, totalNight: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Unit Value (Rate)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.roomPerNight}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, roomPerNight: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Extra Charges</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.additionalCharges}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, additionalCharges: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Booking Serial (ID)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.bookingBookingID}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, bookingBookingID: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Settlement Protocol</label>
                  <select
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.paymentMethod}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentMethod: e.target.value })}
                    required
                  >
                    <option value="">Select Protocol</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="cash">Cash Settlement</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Resource Recieved (Cash)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.cashReceive}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cashReceive: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Logging Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    value={paymentDetails.createdAt}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, createdAt: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-slate-50 p-6 rounded-lg border border-slate-100 gap-4">
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Gross Total</span>
                    <span className="text-xl font-black text-slate-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Refund / Balance</span>
                    <span className={`text-xl font-black ${balance < 0 ? "text-rose-500" : "text-teal-600"}`}>
                      ${balance.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 md:flex-none px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all"
                  >
                    Abort
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 md:flex-none px-8 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest bg-teal-500 hover:bg-teal-600 text-white transition-all shadow-sm"
                  >
                    Commit Transaction
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentAddForm;
