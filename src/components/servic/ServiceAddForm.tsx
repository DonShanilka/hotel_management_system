import React, { useEffect, useState } from 'react';
import ServiceTable from './ServiceTable';
import { useDispatch, useSelector } from "react-redux";
import { getAllService, saveService, updateService, deleteService } from "../../reducer/ServiceSlice.ts";
import { Package, Search, Sparkles } from "lucide-react";

const ServiceAddForm: React.FC = () => {
  const [serviceID, setServiceID] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const service = useSelector((state: any) => state.service || []);

  useEffect(() => {
    dispatch(getAllService());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      serviceName,
      servicePrice: Number(servicePrice),
      description,
      createdAt: new Date().toISOString(),
    };

    const updateData = {
      serviceID: Number(serviceID),
      serviceName,
      servicePrice: Number(servicePrice),
      description,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      dispatch(updateService(updateData));
      setEditIndex(null);
    } else {
      dispatch(saveService(serviceData));
    }

    setServiceID('');
    setServiceName('');
    setServicePrice('');
    setDescription('');
  };

  const handleDelete = (sId: number) => {
    const isConfirm = window.confirm("Are you sure want to delete Service ?");
    if (isConfirm) {
      dispatch(deleteService(sId))
    }
  };

  const handleUpdate = (index: number, sID: number) => {
    const serviceToUpdate = service?.find((s: any) => s.serviceID === sID);

    if (!serviceToUpdate) {
      console.error("Service not found for ID:", sID);
      return;
    }
    setServiceID(serviceToUpdate.serviceID.toString());
    setServiceName(serviceToUpdate.serviceName);
    setServicePrice(serviceToUpdate.servicePrice.toString());
    setDescription(serviceToUpdate.description);
    setEditIndex(index);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Service Repository
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100">OFFERINGS</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search services..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Package size={14} className="text-teal-500" /> {editIndex !== null ? "Modify Catalog Item" : "New Service Definition"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Service Name</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Cleaning, Meal, etc."
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Unit Price ($)</label>
              <input
                type="number"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
                placeholder="0.00"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Catalog Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief service utility declaration..."
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className={`px-8 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${editIndex !== null
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
            >
              {editIndex !== null ? "Update Defintion" : "Register offering"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Sparkles size={14} className="text-teal-500" /> Active Service Directory
        </h2>
        <ServiceTable services={service} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ServiceAddForm;
