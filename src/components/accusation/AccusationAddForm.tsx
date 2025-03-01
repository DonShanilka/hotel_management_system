import React, { useEffect, useState } from "react";
import AccusationTable from "./AccusationTable";
import { useDispatch, useSelector } from "react-redux";
import { getallAccusation, saveAccusation, updateAccusation, deteleAccusation } from "../../reducer/AccusationSlice.ts";

const AccusationAddForm: React.FC = () => {
  const [reportType, setReportType] = useState("Housekeeping");
  const [accusationId, setAccusationId] = useState("");
  const [guestId, setGuestId] = useState("");
  const [description, setDescription] = useState("");
  const [reportList, setReportList] = useState<{ reportType: string; guestId: string; description: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const accusations = useSelector((state)=>state.accusations || []);

  useEffect(() => {
    dispatch(getallAccusation())
  },[dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport = { reportType, guestId, description };
    const updateData = {accusationId,reportType , guestId, description};

    if (editIndex !== null) {
      
      const updatedList = [...reportList];
      updatedList[editIndex] = newReport;
      setReportList(updatedList);
      setEditIndex(null);
      dispatch(updateAccusation(updateData)); // redux store ekata yanwa
    } else {
      // setReportList([...reportList, newReport]);
      dispatch(saveAccusation(newReport));
      console.log("Wade Goda", reportList);
    }
  };

  const handleDelete = (accId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete Acc ?");
    if(isConfirm){
      dispatch(deteleAccusation(accId))
    }else{
      alert("Delete Failed, try again!")
    }
  };

  const handleUpdate = (index: number, accId: string) => {
    console.log("Accusations list:", accusations); 
    console.log("Looking for accusationId:", accId);
  
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reporting Form</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Guest ID</label>
            <input
              type="text"
              value={guestId}
              onChange={(e) => setGuestId(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="Housekeeping">Housekeeping</option>
              <option value="Foods">Foods</option>
              <option value="Employee">Employee</option>
              <option value="Room">Rooms</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Description / Notes</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 p-2 border rounded-lg"
            placeholder="Enter additional information or notes"
          />
        </div>

        <button
          type="submit"
          className={`mt-4 w-full py-2 rounded-lg text-white transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editIndex !== null ? "Update Accusation" : "Add Accusation"}
        </button>
      </form>

      <AccusationTable acc={accusations} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default AccusationAddForm;
