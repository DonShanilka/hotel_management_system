import React from 'react';
import { Edit2, Trash2 } from "lucide-react";

interface ServiceTableProps {
  services: any[];
  onDelete: (sId: number) => void;
  onUpdate: (index: number, sId: number) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services = [], onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Internal ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Offering Name</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Description</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Unit Value ($)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service, index) => (
              <tr key={service.serviceID} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-2 text-[10px] font-black text-slate-900 uppercase">#{service.serviceID}</td>
                <td className="py-4 px-2">
                  <span className="text-[11px] font-bold text-slate-900">{service.serviceName}</span>
                </td>
                <td className="py-4 px-2">
                  <p className="text-[10px] font-bold text-slate-500 max-w-[300px] truncate">{service.description}</p>
                </td>
                <td className="py-4 px-2 text-[11px] font-black text-slate-900">
                  ${Number(service.servicePrice).toFixed(2)}
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onUpdate(index, service.serviceID)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(service.serviceID)}
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
              <td colSpan={5} className="py-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                Unauthorized - No catalog entries detected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
