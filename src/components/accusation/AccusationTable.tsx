import React from "react";
import { Edit2, Trash2, AlertCircle } from "lucide-react";

type Report = {
  accusationId: number;
  reportType: string;
  guestId: string;
  description: string;
};

interface ReportTableProps {
  acc: Report[];
  onDelete: (accId: string) => void;
  onUpdate: (index: number, accId: string) => void;
}

const AccusationTable: React.FC<ReportTableProps> = ({ acc = [], onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Incident ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Entity (Guest)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Classification</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Brief Analysis</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {acc.length > 0 ? (
            acc.map((report, index) => (
              <tr key={report.accusationId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group text-left">
                <td className="py-4 px-2 text-[10px] font-black text-rose-600 uppercase">#{report.accusationId}</td>
                <td className="py-4 px-2">
                  <span className="text-[11px] font-bold text-slate-900">{report.guestId}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border border-rose-100 bg-rose-50/30 text-rose-600 flex items-center gap-1.5 w-fit">
                    <AlertCircle size={10} />
                    {report.reportType}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <p className="text-[10px] font-bold text-slate-500 max-w-[400px] truncate">{report.description || "Incomplete brief."}</p>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onUpdate(index, report.accusationId.toString())}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(report.accusationId.toString())}
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
                Unauthorized - No incident logs detected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccusationTable;
