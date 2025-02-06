import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const guestSlice = createSlice({
  name: 'guest',
  initialState: initialState,
  reducers: {
    addGuest(state, action) {
      state.push(action.payload);
    },
    updateGuest: (state, action) => {
      const {id, guest} = action.payload;
      const guestIndex = state.findIndex(
        (guest) => guest.id === id
      );
      if (guestIndex !== -1) {
        state[guestIndex] = guest;
      }
    },
    deleteGuest: (state, action) => {
      return state.filter((guest) => guest.id !== action.payload.id);
    },
  },
});

export const {addGuest, updateGuest, deleteGuest} = guestSlice.actions;
export default guestSlice.reducer;

