import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const accusationSlice = createSlice({
  name: "accusation",
  initialState: initialState,
  reducers: {
    addAccusation(state, action) {
      state.push(action.payload);
    },
    updateAccusation: (state, action) => {
      const { id, accusation } = action.payload;
      const accusationIndex = state.findIndex(
        (accusation) => accusation.id === id
      );
      if (accusationIndex !== -1) {
        state[accusationIndex] = accusation;
      }
    },
    deleteAccusation: (state, action) => {
      return state.filter((accusation) => accusation.id !== action.payload.id);
    },
  },
});

export const { addAccusation, updateAccusation, deleteAccusation } =
  accusationSlice.actions;
export default accusationSlice.reducer;