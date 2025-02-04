import React from 'react';

function RoomCard({ rooms }) {
  return (
    <div
      className="mt-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-lg"
      style={{ height: '600px' }}
    >
      {rooms.map((room, index) => (
        <div key={index} className="h-52 bg-white p-4 rounded-lg shadow-md flex justify-between items-center relative">
          {/* Left side content */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">Room {room.roomNumber}</h2>
            <p className="text-gray-600">
              <strong>Type:</strong> {room.roomType}
            </p>
            <p className="text-gray-600">
              <strong>Hall Floor:</strong> {room.hallFloor}
            </p>
            <p className="text-gray-600">
              <strong>Price:</strong> ${room.price}
            </p>
            <p
              className={`text-white px-2 py-1 rounded-md w-max ${
                room.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
              }`}
            > <strong>Status:</strong>
               {room.status}
            </p>

            {/* Buttons aligned to the right */}
            <div className="flex space-x-2 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Update
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>

          {/* Right side - Room Image */}
          {room.selectedImage && (
            <div className="ml-4">
              <img src={room.selectedImage} alt="Room" className="w-44 h-48 rounded-md border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RoomCard;
