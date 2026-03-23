import React from "react";
import { Trash2, CreditCard, Banknote, Landmark, Wallet } from "lucide-react";

type PaymentEntry = {
  paymentId: number;
  roomNumber: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  totalNight: number;
  roomPerNight: number;
  additionalCharges: number;
  paymentMethod: string;
  cashReceive: number;
};

interface PaymentTableProps {
  paymentList: PaymentEntry[];
  onDelete: (pId: number) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ paymentList = [], onDelete }) => {
  const getMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'credit': return <CreditCard size={10} />;
      case 'debit': return <Wallet size={10} />;
      case 'cash': return <Banknote size={10} />;
      case 'bank': return <Landmark size={10} />;
      default: return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Internal ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Entity (Guest)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Asset (Room)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Duration</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Protocol</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Settlement Value</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {paymentList.length > 0 ? (
            paymentList.map((payment) => (
              <tr key={payment.paymentId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-2 text-[10px] font-black text-slate-900 uppercase">#{payment.paymentId}</td>
                <td className="py-4 px-2">
                  <span className="text-[11px] font-bold text-slate-900">{payment.guestName}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[10px] font-black bg-slate-100 px-1.5 py-0.5 rounded-lg text-slate-600 border border-slate-200">R-{payment.roomNumber}</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900">{payment.totalNight} Nights</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{payment.checkInDate.split('T')[0]} - {payment.checkOutDate.split('T')[0]}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-600">
                    {getMethodIcon(payment.paymentMethod)}
                    {payment.paymentMethod}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-900">${payment.cashReceive.toLocaleString()}</span>
                    <span className="text-[8px] font-bold text-teal-600 uppercase tracking-tighter">Settled</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onDelete(payment.paymentId)}
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
              <td colSpan={7} className="py-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                Unauthorized - No ledger entries detected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
