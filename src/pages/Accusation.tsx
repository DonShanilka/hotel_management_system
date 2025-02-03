import React, { useState } from 'react';

const Accusation: React.FC = () => {
  const [reportType, setReportType] = useState('Housekeeping');
  const [guestId, setGuestId] = useState('');
  const [description, setDescription] = useState('');
  const [reportList, setReportList] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport = {
      reportType,
      guestId,
      description,
    };

    setReportList([...reportList, newReport]);

    // Reset form after submission
    setReportType('Housekeeping');
    setGuestId('');
    setDescription('');
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
              <option value="Billing">Foods</option>
              <option value="Guest">Employee</option>
              <option value="Room Availability">Rooms</option>
            </select>
          </div>
        </div>

        <div className='mt-4'>
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
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Report
        </button>
      </form>

      {/* Display Reports */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Reports</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {reportList.map((report, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <p><strong>Report Type:</strong> {report.reportType}</p>
              <p><strong>Start Date:</strong> {report.startDate}</p>
              <p><strong>End Date:</strong> {report.endDate}</p>
              <p><strong>Description:</strong> {report.description || 'No description'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accusation;
