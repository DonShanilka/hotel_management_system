import React from 'react';
import { Edit2, Trash2, Calendar, ClipboardList } from "lucide-react";

interface ServiceUsageTableProps {
  serviceUsages: any[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const ServiceUsageTable: React.FC<ServiceUsageTableProps> = ({ serviceUsages = [], onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Allocation ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Entity (Guest)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Protocol (Service)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Metrics</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Timestamp</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {serviceUsages.length > 0 ? (
            serviceUsages.map((usage, index) => (
              <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group text-left">
                <td className="py-4 px-2 text-[10px] font-black text-teal-600 uppercase">#{usage.usageID}</td>
                <td className="py-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-900">{usage.guestId}</span>
                    <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                      <ClipboardList size={10} /> {usage.bookingID}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                    {usage.serviceID}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-900">${Number(usage.totalCost).toLocaleString()}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Qty: {usage.quantity}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                    <Calendar size={10} /> {usage.usageDate}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onUpdate(index)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(index)}
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
                Resource Audit Empty - No allocations detected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceUsageTable;
