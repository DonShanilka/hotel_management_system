import React from 'react';
import { CalendarToday, Add, Search, Notifications } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const dummyData = {
    totalRooms: 50,
    availableRooms: 20,
    bookedRooms: 30,
    revenueToday: 1200,
    guestList: [
      { id: 1, name: 'John Doe', checkIn: 'Aug 15', checkOut: 'Aug 18', roomType: 'Suite', status: 'Checked In' },
      { id: 2, name: 'Jane Smith', checkIn: 'Aug 16', checkOut: 'Aug 20', roomType: 'Deluxe', status: 'Confirmed' },
    ],
    foodList: [
      { id: 1, name: 'Pasta Carbonara', imageUrl: 'path/to/pasta.jpg', price: 15 },
      { id: 2, name: 'Chicken Salad', imageUrl: 'path/to/salad.jpg', price: 12 },
    ],
    roomList: [
      { id: 1, name: 'Luxury Suite', imageUrl: 'path/to/suite.jpg', price: 300, amenities: 'King Bed, Ocean View' },
      { id: 2, name: 'Deluxe Room', imageUrl: 'path/to/deluxe.jpg', price: 200, amenities: 'Queen Bed, City View' },
    ],
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Header Section */}
        <div className="flex justify-between items-center col-span-3">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <Search />
            </button>
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <Notifications />
            </button>
            <img alt="User" className="w-10 h-10 rounded-full" src="/static/images/avatar/1.jpg" />
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-200">Total Rooms</p>
              <p className="text-lg font-bold text-white">{dummyData.totalRooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">Available Rooms</p>
              <p className="text-lg font-bold text-green-300">{dummyData.availableRooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">Booked Rooms</p>
              <p className="text-lg font-bold text-red-300">{dummyData.bookedRooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">Revenue Today</p>
              <p className="text-lg font-bold text-blue-300">${dummyData.revenueToday}</p>
            </div>
          </div>
        </div>

        {/* Guest List Section */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 shadow-lg rounded-lg p-6 col-span-3 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Guest List</h2>
          <div className="space-y-4">
            {dummyData.guestList.map((guest) => (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg" key={guest.id}>
                <div>
                  <p className="font-semibold">{guest.name}</p>
                  <p>{guest.roomType}</p>
                  <p>{guest.checkIn} - {guest.checkOut}</p>
                  <p className="text-gray-500">{guest.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Food List Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Food List</h2>
          <div className="grid grid-cols-2 gap-4">
            {dummyData.foodList.map((food) => (
              <div key={food.id} className="flex flex-col items-center">
                <img src={food.imageUrl} alt={food.name} className="w-full rounded-lg mb-2" />
                <p className="font-semibold text-white">{food.name}</p>
                <p className="text-gray-200">${food.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Room List Section */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Room List</h2>
          <div className="grid grid-cols-2 gap-4">
            {dummyData.roomList.map((room) => (
              <div key={room.id} className="flex flex-col items-center">
                <img src={room.imageUrl} alt={room.name} className="w-full rounded-lg mb-2" />
                <p className="font-semibold text-white">{room.name}</p>
                <p className="text-gray-200">${room.price}</p>
                <p className="text-sm text-gray-200">{room.amenities}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Room Section */}
        <div className="bg-gradient-to-r from-pink-500 to-red-500 shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Add Room</h2>
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              <Add />
            </button>
          </div>
          {/* Add Room Form or List */}
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg rounded-lg p-6 col-span-3 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <CalendarToday className="mr-2 text-blue-500" />
              <p className="text-white">Wedding Event - 5th March</p>
            </div>
            <div className="flex items-center">
              <CalendarToday className="mr-2 text-blue-500" />
              <p className="text-white">Business Conference - 10th March</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
