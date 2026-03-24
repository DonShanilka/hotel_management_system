import React from 'react';
import { Edit2, Trash2 } from "lucide-react";

interface Reservation {
  bookingID: number;
  guestID: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  totalNight: number;
  bookingStatus: string;
  createdAt: string;
}

interface ReservationTableProps {
  reservations: Reservation[];
  onDelete: (bookingID: string) => void;
  onUpdate: (index: number, bookingID: string) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Guest</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Room</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">In / Out</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Amount</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Status</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={reservation.bookingID} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
              <td className="py-4 px-2 text-[10px] font-black text-slate-900 uppercase">#{reservation.bookingID}</td>
              <td className="py-4 px-2 text-[11px] font-bold text-slate-600">{reservation.guestID}</td>
              <td className="py-4 px-2">
                <span className="text-[10px] font-black bg-slate-100 px-1.5 py-0.5 rounded-lg text-slate-600">R-{reservation.roomNumber}</span>
              </td>
              <td className="py-4 px-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-900">{reservation.checkInDate}</span>
                  <span className="text-[9px] font-bold text-slate-400">{reservation.checkOutDate}</span>
                </div>
              </td>
              <td className="py-4 px-2">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-slate-900">${reservation.totalAmount}</span>
                  <span className="text-[9px] font-bold text-slate-400">{reservation.totalNight} Nights</span>
                </div>
              </td>
              <td className="py-4 px-2">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border ${reservation.bookingStatus === "Confirmed"
                    ? "bg-teal-50 text-teal-600 border-teal-100"
                    : reservation.bookingStatus === "Cancelled"
                      ? "bg-rose-50 text-rose-600 border-rose-100"
                      : "bg-blue-50 text-blue-500 border-blue-100"
                  }`}>
                  {reservation.bookingStatus}
                </span>
              </td>
              <td className="py-4 px-2 text-right">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onUpdate(index, reservation.bookingID.toString())}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => onDelete(reservation.bookingID.toString())}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
