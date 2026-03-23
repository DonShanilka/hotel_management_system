import React from "react";
import { Edit2, Trash2, Globe } from "lucide-react";

type Guest = {
  guestId: string;
  guestName: string;
  contactNumber: string;
  email: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  nation: string;
};

interface GuestTableProps {
  guests: Guest[];
  onDelete: (guestId: string) => void;
  onUpdate: (index: number, guestId: string) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests = [], onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Internal ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Identity</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Asset (Room)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Lifecycle (In/Out)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Region</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map((guest, index) => (
              <tr key={guest.guestId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-2 text-[10px] font-black text-slate-900 uppercase">#{guest.guestId.slice(-6)}</td>
                <td className="py-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-900">{guest.guestName}</span>
                    <span className="text-[9px] font-bold text-slate-400">{guest.email}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[10px] font-black bg-slate-100 px-1.5 py-0.5 rounded-lg text-slate-600 border border-slate-200">R-{guest.roomNumber}</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-600">{guest.checkInDate}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <span className="text-[10px] font-bold text-slate-400">{guest.checkOutDate}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase ${guest.nation === "Local" ? "text-teal-600" : "text-amber-600"
                    }`}>
                    <Globe size={10} /> {guest.nation}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onUpdate(index, guest.guestId)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(guest.guestId)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                Unauthorized - No data detected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;
