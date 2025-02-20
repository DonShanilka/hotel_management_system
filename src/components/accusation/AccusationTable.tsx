import React from "react";

type Report = {
  accusationId : number;
  reportType: string;
  guestId: string;
  description: string;
};

interface ReportTableProps {
  acc: Report[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}


const AccusationTable: React.FC<ReportTableProps> = ({ acc, onDelete, onUpdate }) => {


  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4"></h2>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-900 text-white">
          <th className="border p-3 text-left">Accusation Id</th>
            <th className="border p-3 text-left">Guest ID</th>
            <th className="border p-3 text-left">Report Type</th>
            <th className="border p-3 text-left">Description</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {acc.length > 0 ? (
            acc.map((acc, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-300">
                <td className="p-3 text-gray-700">{acc.accusationId}</td>
                <td className="p-3 text-gray-700">{acc.guestId}</td>
                <td className="p-3 text-gray-700">{acc.reportType}</td>
                <td className="p-3 text-gray-700">{acc.description || "No description"}</td>
                <td className="p-3 text-center flex justify-center space-x-2">
                <button
  onClick={() => onUpdate(index, acc.accusationId)}
  className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition shadow-md"
>
  Update
</button>

                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition shadow-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500 bg-gray-50">
                No reports available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default AccusationTable;
