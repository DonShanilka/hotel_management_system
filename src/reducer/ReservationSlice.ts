import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: initialState,
  reducers: {
    addReservation(state, action) {
      state.push(action.payload);
    },
    updateReservation: (state, action) => {
      const {id, reservation} = action.payload;
      const reservationIndex = state.findIndex(
        (reservation) => reservation.id === id
      );
      if (reservationIndex !== -1) {
        state[reservationIndex] = reservation;
      }
    },
    deleteReservation: (state, action) => {
      return state.filter((reservation) => reservation.id !== action.payload.id);
    },
  },
});

export const {addReservation, updateReservation, deleteReservation} = reservationSlice.actions;
export default reservationSlice.reducer;