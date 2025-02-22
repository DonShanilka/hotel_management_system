import React from "react";

type HousekeepingEntry = {
  houseKeepingId : number;
  roomNumber : string;
  cleaningDate : string;
  status : string;
  specialTasks : string;
  empId : string;
};

interface HousekeepingTableProps {
  housekeepingList: HousekeepingEntry[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const HousekeepingTable: React.FC<HousekeepingTableProps> = ({
  housekeepingList,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      {/*<h2 className="text-xl font-semibold text-gray-800 mb-4">Housekeeping Status</h2>*/}

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3 text-left">HouseKeeping Id</th>
            <th className="p-3 text-left">Room Number</th>
            <th className="p-3 text-left">Cleaning Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Employee Id</th>
            <th className="p-3 text-left">Special Tasks</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {housekeepingList.length > 0 ? (
            housekeepingList.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-300">
                <td className="p-3 text-gray-700">{entry.houseKeepingId}</td>
                <td className="p-3 text-gray-700">{entry.roomNumber}</td>
                <td className="p-3 text-gray-700">{entry.cleaningDate}</td>
                <td className="p-3 text-gray-700">{entry.status}</td>
                <td className="p-3 text-gray-700">{entry.empId}</td>
                <td className="p-3 text-gray-700">{entry.specialTasks || "None"}</td>
                <td className="p-3 text-center flex justify-center space-x-2">
                  <button
                    onClick={() => onUpdate(index , entry.houseKeepingId)}
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
              <td colSpan={5} className="p-4 text-center text-gray-500 bg-gray-50">
                No housekeeping records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HousekeepingTable;
