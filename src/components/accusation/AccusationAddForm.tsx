import React, { useEffect, useState } from "react";
import AccusationTable from "./AccusationTable";
import { useDispatch, useSelector } from "react-redux";
import { getallAccusation, saveAccusation, updateAccusation, deteleAccusation } from "../../reducer/AccusationSlice.ts";
import { ShieldAlert, Search, AlertCircle } from "lucide-react";

const AccusationAddForm: React.FC = () => {
  const [reportType, setReportType] = useState("Housekeeping");
  const [accusationId, setAccusationId] = useState("");
  const [guestId, setGuestId] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const accusations = useSelector((state: any) => state.accusations || []);

  useEffect(() => {
    dispatch(getallAccusation() as any)
  }, [dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reportData = { reportType, guestId, description };
    const updateData = { accusationId, reportType, guestId, description };

    if (editIndex !== null) {
      dispatch(updateAccusation(updateData) as any);
      setEditIndex(null);
    } else {
      dispatch(saveAccusation(reportData as any) as any);
    }

    setAccusationId("");
    setGuestId("");
    setDescription("");
  };

  const handleDelete = (accId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete this incident report?");
    if (isConfirm) {
      dispatch(deteleAccusation(accId as any) as any)
    }
  };

  const handleUpdate = (index: number, accId: string) => {
    const report = accusations?.find((acc: any) => acc.accusationId === accId);

    if (!report) {
      console.error("Accusation not found for ID:", accId);
      return;
    }

    setAccusationId(report.accusationId.toString());
    setReportType(report.reportType);
    setGuestId(report.guestId);
    setDescription(report.description);
    setEditIndex(index);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Incident Repository
          <span className="text-[10px] font-black bg-rose-50 text-rose-600 px-2 py-0.5 rounded-lg border border-rose-100">MONITORING</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search incidents..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <ShieldAlert size={14} className="text-rose-500" /> {editIndex !== null ? "Modify Incident Brief" : "Initiate Incident Declaration"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Entity Identifier (Guest ID)</label>
              <input
                type="text"
                value={guestId}
                onChange={(e) => setGuestId(e.target.value)}
                placeholder="G-XXXXX"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Classification Protocol</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white"
                required
              >
                <option value="Housekeeping">Housekeeping Breach</option>
                <option value="Foods">Culinary Deficiency</option>
                <option value="Employee">Staff Conduct</option>
                <option value="Room">Resource Integrity</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Detailed Incident Brief / Analysis</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-24 p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none"
                placeholder="Declare specific incident parameters and operational feedback..."
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
              {editIndex !== null ? "Update Declaration" : "Register Incident"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <AlertCircle size={14} className="text-rose-500" /> System Incident Logs
        </h2>
        <AccusationTable acc={accusations} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default AccusationAddForm;
