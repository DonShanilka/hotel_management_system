import React, { useEffect, useState } from 'react';
import HousekeepingTable from './HousekeepingTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteHouseKeeping,
  getallHouseKeeping,
  saveHouseKeeping,
  updateHouseKeeping
} from "../../reducer/HouseKeepingSlice.ts";
import { getallEmployee } from "../../reducer/EmployeeSlice.ts";
import { getAllRoom } from "../../reducer/RoomSlice.ts";
import { ClipboardCheck, Search, ShieldCheck } from "lucide-react";

const HousekeepingAddForm: React.FC = () => {
  const [houseKeepingId, setHouseKeepingId] = useState<number | null>(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [cleaningDate, setCleaningDate] = useState('');
  const [status, setStatus] = useState('Not Cleaned');
  const [specialTasks, setSpecialTasks] = useState('');
  const [empId, setEmployeeId] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const houseKeeping = useSelector((state: any) => state.houseKeeping || []);
  const employees = useSelector((state: any) => state.employees || []);
  const rooms = useSelector((state: any) => state.rooms || []);

  useEffect(() => {
    dispatch(getallHouseKeeping());
    dispatch(getallEmployee());
    dispatch(getAllRoom());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const housekeepingData = {
      roomNumber,
      cleaningDate,
      status,
      specialTasks,
      empId,
    };

    const updateData = {
      houseKeepingId,
      roomNumber,
      cleaningDate,
      status,
      specialTasks,
      empId,
    };

    if (editIndex !== null) {
      dispatch(updateHouseKeeping(updateData));
      setHouseKeepingId(null);
      setEditIndex(null);
    } else {
      dispatch(saveHouseKeeping(housekeepingData));
    }

    setRoomNumber('');
    setCleaningDate('');
    setStatus('Not Cleaned');
    setSpecialTasks('');
    setEmployeeId('');
  };

  const handleUpdate = (index: number, hkId: number) => {
    const houseKeepingToUpdate = houseKeeping.find((hk: any) => hk.houseKeepingId === hkId);

    if (!houseKeepingToUpdate) {
      console.error("HouseKeeping not found for ID: ", hkId);
      return;
    }

    setHouseKeepingId(houseKeepingToUpdate.houseKeepingId);
    setRoomNumber(houseKeepingToUpdate.roomNumber);
    setCleaningDate(houseKeepingToUpdate.cleaningDate);
    setStatus(houseKeepingToUpdate.status);
    setSpecialTasks(houseKeepingToUpdate.specialTasks);
    setEmployeeId(houseKeepingToUpdate.empId || '');
    setEditIndex(index);
  };

  const handleDelete = (hkId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete HouseKeeping ?");
    if (isConfirm) {
      dispatch(deleteHouseKeeping(hkId))
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Housekeeping Protocol
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100">MAINTENANCE</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search assets..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <ClipboardCheck size={14} className="text-teal-500" /> {editIndex !== null ? "Modify Task" : "New Service Entry"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Asset (Room)</label>
              <select
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="">Select Resource</option>
                {rooms.map((room: any) => (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    Room {room.roomNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Scheduled Date</label>
              <input
                type="date"
                value={cleaningDate}
                onChange={(e) => setCleaningDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Operational Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="Not Cleaned">Pending (Not Cleaned)</option>
                <option value="Cleaned">Verified (Cleaned)</option>
                <option value="Under Maintenance">Maintenance Mode</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Authorized Agent (Staff)</label>
              <select
                value={empId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              >
                <option value="">Select Personnel</option>
                {employees.map((employee: any) => (
                  <option key={employee.employeeID} value={employee.employeeID}>
                    {employee.employeeID} - {employee.firstName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 lg:col-span-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Special Protocols (Tasks)</label>
              <textarea
                value={specialTasks}
                onChange={(e) => setSpecialTasks(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all h-20 resize-none"
                placeholder="Declare any specific maintenance requirements..."
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
              {editIndex !== null ? "Update Protocol" : "Authorize Service"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <ShieldCheck size={14} className="text-teal-500" /> Maintenance Logs
        </h2>
        <HousekeepingTable housekeepingList={houseKeeping} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default HousekeepingAddForm;
