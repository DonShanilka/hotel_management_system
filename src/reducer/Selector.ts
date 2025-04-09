import { RootState } from "../store/store";
import { Room } from "../model/Room";

// Selector to get total number of rooms
export const selectTotalRooms = (state: RootState): number =>
  state.rooms.length;

// Selector to get available rooms count
export const selectAvailableRoomsCount = (state: RootState): number =>
  state.rooms.filter((room: Room) => room.availability === "Available").length;