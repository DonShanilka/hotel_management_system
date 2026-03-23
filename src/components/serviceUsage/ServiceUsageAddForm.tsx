import React, { useState } from 'react';
import ServiceUsageTable from './ServiceUsageTable';
import { Briefcase, Search, Plus, Calendar, Hash, UserCircle2, DollarSign, Settings } from "lucide-react";

const ServiceUsageAddForm: React.FC = () => {
  const [usageID, setUsageID] = useState('');
  const [bookingID, setBookingID] = useState('');
  const [guestId, setGuestId] = useState('');
  const [serviceID, setServiceID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [usageDate, setUsageDate] = useState('');
  const [serviceUsageList, setServiceUsageList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUsage = {
      usageID: usageID || `U-${Math.floor(Math.random() * 10000)}`,
      bookingID,
      guestId,
      serviceID,
      quantity,
      totalCost,
      usageDate,
    };

    if (editIndex !== null) {
      const updatedList = [...serviceUsageList];
      updatedList[editIndex] = newUsage;
      setServiceUsageList(updatedList);
      setEditIndex(null);
    } else {
      setServiceUsageList([...serviceUsageList, newUsage]);
    }

    setUsageID('');
    setBookingID('');
    setGuestId('');
    setServiceID('');
    setQuantity('');
    setTotalCost('');
    setUsageDate('');
  };

  const handleDelete = (index: number) => {
    const isConfirm = window.confirm("Terminate this resource allocation record?");
    if (isConfirm) {
      setServiceUsageList(serviceUsageList.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = (index: number) => {
    const usageToUpdate = serviceUsageList[index];
    setUsageID(usageToUpdate.usageID);
    setBookingID(usageToUpdate.bookingID);
    setGuestId(usageToUpdate.guestId);
    setServiceID(usageToUpdate.serviceID);
    setQuantity(usageToUpdate.quantity);
    setTotalCost(usageToUpdate.totalCost);
    setUsageDate(usageToUpdate.usageDate);

    setEditIndex(index);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Service Provisioning
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100 uppercase">Resource Audit</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search allocations..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Briefcase size={14} className="text-teal-500" /> {editIndex !== null ? "Modify Allocation Parameters" : "Initiate Service Allocation"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Hash size={10} /> Booking Identifier
              </label>
              <input
                type="text"
                value={bookingID}
                onChange={(e) => setBookingID(e.target.value)}
                placeholder="B-XXXX"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <UserCircle2 size={10} /> Entity ID (Guest)
              </label>
              <input
                type="text"
                value={guestId}
                onChange={(e) => setGuestId(e.target.value)}
                placeholder="G-XXXX"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Settings size={10} /> Service Protocol ID
              </label>
              <input
                type="text"
                value={serviceID}
                onChange={(e) => setServiceID(e.target.value)}
                placeholder="S-XXXX"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Plus size={10} /> Unit Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <DollarSign size={10} /> Total Valuation ($)
              </label>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                placeholder="0.00"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all font-bold text-slate-900"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar size={10} /> Allocation Date
              </label>
              <input
                type="date"
                value={usageDate}
                onChange={(e) => setUsageDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className={`px-8 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${editIndex !== null
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-100"
                }`}
            >
              {editIndex !== null ? "Update Allocation" : "Register Allocation"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Calendar size={14} className="text-teal-500" /> Allocation Audit Logs
        </h2>
        <ServiceUsageTable serviceUsages={serviceUsageList} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ServiceUsageAddForm;
