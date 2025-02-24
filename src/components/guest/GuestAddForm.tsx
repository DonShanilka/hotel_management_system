import React, { useEffect, useState } from 'react';
import GuestTable from './GuestTable';
import { useDispatch, useSelector } from 'react-redux';
import { deteleGuest, getallGuest, saveGuest, updateGuest } from '../../reducer/GuestSlice';
import {getAllRoom} from "../../reducer/RoomSlice.ts";

const GuestAddForm: React.FC = () => {
  const [guestId, setGuestId] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestList, setGuestList] = useState<any[]>([]);
  const [nation, setNation] = useState("Local");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const guests = useSelector((state) => state.guests || []);
  const rooms = useSelector((state)=>state.rooms || []);
  // console.log(guests)

  useEffect(() => {
    dispatch(getallGuest());
    dispatch(getAllRoom());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newGuest = {
      guestId,
      guestName,
      contactNumber,
      email,
      roomNumber,
      checkInDate,
      checkOutDate,
      nation
    };

    const updateData = {
      guestId,
      guestName,
      contactNumber,
      email,
      roomNumber,
      checkInDate,
      checkOutDate,
      nation
    };

    if (editIndex !== null) {
      const updatedList = [...guestList];
      updatedList[editIndex] = newGuest;
      // setGuestList(updatedList);
      dispatch(updateGuest(updateData))
      setEditIndex(null);
      // dispatch()
    } else {
      // setGuestList([...guestList, newGuest]);
      dispatch(saveGuest(newGuest));
    }

    // setGuestList([...guestList, newGuest]);

    setGuestId('');
    setGuestName('');
    setContactNumber('');
    setEmail('');
    setRoomNumber('');
    setCheckInDate('');
    setCheckOutDate('');
    setNation("Local");
  };

  const handleDelete = (guId: string) => {
    const isConfirm = window.confirm("Are you sure want to delete Guest ?");
    if(isConfirm){
      dispatch(deteleGuest(guId))
    }else{
      alert("Delete Failed, try again!")
    }
  };

  const handleUpdate = (index: number, guestID : string) => {
    // const guestToUpdate = guestList[index];

    const guestToUpdate = guests?.find((gu: any) => gu.guestId === guestID);
  
    if (!guestToUpdate) {
      console.error("Guest not found for ID:", guestID);
      return;
    }

    setGuestId(guestToUpdate.guestId);
    setGuestName(guestToUpdate.guestName);
    setContactNumber(guestToUpdate.contactNumber);
    setEmail(guestToUpdate.email);
    setRoomNumber(guestToUpdate.roomNumber);
    setCheckInDate(guestToUpdate.checkInDate);
    setCheckOutDate(guestToUpdate.checkOutDate);
    setNation(guestToUpdate.nation);

    setEditIndex(index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Guest Management Form</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-gray-700 font-medium mb-1">Guest NIC/Passport ID</label>
            <input
              type="text"
              value={guestId}
              onChange={(e) => setGuestId(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Guest Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Room Number</label>
            <select
                // value={empId}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full p-2 border rounded-lg"
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
            <label className="block text-gray-700 font-medium mb-1">Check-in Date</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Check-out Date</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Nation</label>
            <select
              value={nation}
              onChange={(e) => setNation(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="Local">Local</option>
              <option value="Foreign">Foreign</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editIndex !== null ? "Update Guest" : "Add Guest"}
        </button>
      </form>
      <GuestTable guests={guests} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default GuestAddForm;
