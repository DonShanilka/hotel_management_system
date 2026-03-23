import React from "react";
import { Edit2, Trash2, CheckCircle2, Clock, Hammer } from "lucide-react";

type HousekeepingEntry = {
  houseKeepingId: number;
  roomNumber: string;
  cleaningDate: string;
  status: string;
  specialTasks: string;
  empId: string;
};

interface HousekeepingTableProps {
  housekeepingList: HousekeepingEntry[];
  onDelete: (hkId: string) => void;
  onUpdate: (index: number, hkId: number) => void;
}

const HousekeepingTable: React.FC<HousekeepingTableProps> = ({
  housekeepingList = [],
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Internal ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Asset (Room)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Agent</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Schedule</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Protocol Status</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {housekeepingList.length > 0 ? (
            housekeepingList.map((entry, index) => (
              <tr key={entry.houseKeepingId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-2 text-[10px] font-black text-slate-900 uppercase">#{entry.houseKeepingId}</td>
                <td className="py-4 px-2">
                  <span className="text-[10px] font-black bg-slate-100 px-1.5 py-0.5 rounded-lg text-slate-600 border border-slate-200">R-{entry.roomNumber}</span>
                </td>
                <td className="py-4 px-2 text-[11px] font-bold text-slate-600 uppercase">{entry.empId}</td>
                <td className="py-4 px-2 text-[10px] font-bold text-slate-900">{entry.cleaningDate}</td>
                <td className="py-4 px-2">
                  <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border ${entry.status === "Cleaned"
                      ? "bg-teal-50 text-teal-600 border-teal-100"
                      : entry.status === "Under Maintenance"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                    {entry.status === "Cleaned" ? <CheckCircle2 size={10} /> : entry.status === "Under Maintenance" ? <Hammer size={10} /> : <Clock size={10} />}
                    {entry.status}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onUpdate(index, entry.houseKeepingId)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(entry.houseKeepingId.toString())}
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
                Unauthorized - No records detected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HousekeepingTable;
