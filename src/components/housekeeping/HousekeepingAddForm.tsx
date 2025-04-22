import React, { useEffect, useState } from 'react';
import HousekeepingTable from './HousekeepingTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteHouseKeeping,
  getallHouseKeeping,
  saveHouseKeeping,
  updateHouseKeeping
} from "../../reducer/HouseKeepingSlice.ts";
import {getallEmployee} from "../../reducer/EmployeeSlice.ts";
import {getAllRoom} from "../../reducer/RoomSlice.ts";

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
  const employees = useSelector((state) => state.employees || []);
  const rooms = useSelector((state)=>state.rooms || []);

  console.log("Emp Id ",employees.employeeID);

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

    console.log(housekeepingData);

    const updateData = {
      houseKeepingId,
      roomNumber,
      cleaningDate,
      status,
      specialTasks,
      empId,
    };

    if (editIndex !== null) {
      const updatedList = [];
      updatedList[editIndex] = housekeepingData;
      dispatch(updateHouseKeeping(updateData));
      setHouseKeepingId(null);
    } else {
      dispatch(saveHouseKeeping(housekeepingData));
    }

    setRoomNumber('');
    setCleaningDate('');
    setStatus('Not Cleaned');
    setSpecialTasks('');
    setEmployeeId('');
  };

  const handleUpdate = (index: number, houseKeepingId: number) => {
    const houseKeepingToUpdate = houseKeeping.find((hk: any) => hk.houseKeepingId === houseKeepingId);

    if (!houseKeepingToUpdate) {
      console.error("HouseKeeping not found for ID: ", houseKeepingId);
      return;
    }

    setHouseKeepingId(houseKeepingToUpdate.houseKeepingId);
    setRoomNumber(houseKeepingToUpdate.roomNumber);
    setCleaningDate(houseKeepingToUpdate.cleaningDate);
    setStatus(houseKeepingToUpdate.status);
    setSpecialTasks(houseKeepingToUpdate.specialTasks);
    setEmployeeId(houseKeepingToUpdate.employeeId || ''); 

    setEditIndex(index);
  };

  const handleDelete = (hkId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete HouseKeeping ?");
    if(isConfirm){
      dispatch(deleteHouseKeeping(hkId))
    }else{
      alert("Delete Failed, try again!")
    }
  };

  return (
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Housekeeping Management</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Room Number</label>
              <select
                  
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
              >
                <option value="">Select Room Number</option>
                {rooms.map((room : any) => (
                    <option key={room.roomNumber} value={room.roomNumber}>
                      {room.roomNumber}
                    </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Cleaning Date</label>
              <input
                  type="date"
                  value={cleaningDate}
                  onChange={(e) => setCleaningDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Status</label>
              <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
              >
                <option value="Not Cleaned">Not Cleaned</option>
                <option value="Cleaned">Cleaned</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Employee ID</label>
              <select
                  // value={empId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
              >
                <option value="">Select Employee ID</option>
                {employees.map((employee : any) => (
                    <option key={employee.employeeID} value={employee.employeeID}>
                      {employee.employeeID}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Special Tasks</label>
            <textarea
                value={specialTasks}
                onChange={(e) => setSpecialTasks(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg h-32"
                placeholder="Any special tasks (e.g. restock minibar, change sheets)"
            />
          </div>

          <button
              type="submit"
              className={`mt-4 w-full text-white py-2 rounded-lg transition ${
                  houseKeepingId !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {houseKeepingId !== null ? "Update Housekeeping" : "Add Housekeeping"}
          </button>
        </form>

        <HousekeepingTable housekeepingList={houseKeeping} onUpdate={handleUpdate} onDelete={handleDelete}/>
      </div>
  );
};

export default HousekeepingAddForm;
