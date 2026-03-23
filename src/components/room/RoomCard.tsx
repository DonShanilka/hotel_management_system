import React from "react";
import { Edit2, Trash2, Home } from "lucide-react";

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
  onUpdate: (index: number, room: Room) => void;
  onDelete: (roomNumber: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ rooms = [], onUpdate, onDelete }) => {

  if (!Array.isArray(rooms)) {
    console.error("RoomCard error: rooms is not an array", rooms);
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room, index) => {
        const { roomNumber, roomType, hallFloor, price, status, selectedImage } = room;

        return (
          <div
            key={index}
            className="group bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-teal-500/50"
          >
            <div className="relative h-40 bg-slate-50 overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={`Room ${roomNumber}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Home size={48} />
                </div>
              )}
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border ${status === "Available"
                    ? "bg-teal-50 text-teal-600 border-teal-100"
                    : status === "Under Maintenance"
                      ? "bg-amber-50 text-amber-600 border-amber-100"
                      : "bg-rose-50 text-rose-600 border-rose-100"
                  }`}>
                  {status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">Room {roomNumber}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{roomType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-teal-600">${price}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Floor {hallFloor}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                <button
                  onClick={() => onUpdate(index, room)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-600 transition-colors text-[10px] font-black uppercase tracking-wider"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => onDelete(roomNumber.toString())}
                  className="px-3 py-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomCard;
