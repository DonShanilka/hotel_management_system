import React from "react";

type Room = {
  roomNumber: number;
  roomType: string;
  selectedImage?: string; 
  hallFloor: number;
  price: string;
  status: string;
};

interface RoomCardProps {
  rooms: Room[];
  onUpdate: (index: number) => void;
  onDelete: (roomNumber: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ rooms = [], onUpdate, onDelete }) => {

  if (!Array.isArray(rooms)) {
    console.error("RoomCard error: rooms is not an array", rooms);
  }

  return (
      <div
          className="mt-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-lg"
          style={{ height: "600px" }}
      >
        {rooms.map((room, index) => {
          const { roomNumber, roomType, hallFloor, price, status, selectedImage } = room;

          return (
              <div
                  key={index}
                  className="h-52 bg-white p-4 rounded-lg shadow-md flex justify-between items-center relative"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Room {roomNumber}
                  </h2>
                  <p className="text-gray-600">
                    <strong>Type:</strong> {roomType}
                  </p>
                  <p className="text-gray-600">
                    <strong>Hall Floor:</strong> {hallFloor}
                  </p>
                  <p className="text-gray-600">
                    <strong>Price:</strong> ${price}
                  </p>
                  <p
                      className={`text-black px-2 py-1 rounded-md w-max ${
                        status === "Available"
                        ? "bg-green-300"
                        : status === "Under Maintenance"
                        ? "bg-yellow-200"
                        : "bg-orange-300"
                      
                      }`}
                  >
                    <strong>Status:</strong> {status}
                  </p>

                 
                  <div className="flex space-x-2 mt-4">
                  <button
                      onClick={() => onUpdate(index, room)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                      Update
                  </button>

                    <button
                        onClick={() => onDelete(roomNumber)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {selectedImage ? (
                    <div className="ml-2">
                      <img
                          src={selectedImage}
                          alt="Room"
                          className="w-28 h-28 rounded-md border"
                      />
                    </div>
                ) : null}
              </div>
          );
        })}
      </div>
  );
};

export default RoomCard;
