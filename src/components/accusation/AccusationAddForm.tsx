import React, { useState } from "react";
import AccusationTable from "./AccusationTable";

const AccusationAddForm: React.FC = () => {
  const [reportType, setReportType] = useState("Housekeeping");
  const [guestId, setGuestId] = useState("");
  const [description, setDescription] = useState("");
  const [reportList, setReportList] = useState<{ reportType: string; guestId: string; description: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport = { reportType, guestId, description };

    if (editIndex !== null) {
      // Update existing report
      const updatedList = [...reportList];
      updatedList[editIndex] = newReport;
      setReportList(updatedList);
      setEditIndex(null);
    } else {
      // Add new report
      setReportList([...reportList, newReport]);
    }

    // Reset form after submission
    setReportType("Housekeeping");
    setGuestId("");
    setDescription("");
  };

  const handleDelete = (index: number) => {
    const updatedList = reportList.filter((_, i) => i !== index);
    setReportList(updatedList);
  };

  const handleUpdate = (index: number) => {
    const report = reportList[index];
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

      {/* Pass the reportList data to the Table Component */}
      <AccusationTable reports={reportList} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default AccusationAddForm;
