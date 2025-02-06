import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    addRoom(state, action) {
      state.push(action.payload);
    },
    updateRoom: (state, action) => {
      const {id, room} = action.payload;
      const roomIndex = state.findIndex(
        (room) => room.id === id
      );
      if (roomIndex !== -1) {
        state[roomIndex] = room;
      }
    },
    deleteRoom: (state, action) => {
      return state.filter((room) => room.id !== action.payload.id);
    },
  },
});

export const {addRoom, updateRoom, deleteRoom} = roomSlice.actions;
export default roomSlice.reducer;