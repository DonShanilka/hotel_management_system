import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const houseKeepingSlice = createSlice({
  name: "houseKeeping",
  initialState: initialState,
  reducers: {
    addHouseKeeping(state, action) {
      state.push(action.payload);
    },
    updateHouseKeeping: (state, action) => {
      const { id, houseKeeping } = action.payload;
      const houseKeepingIndex = state.findIndex(
        (houseKeeping) => houseKeeping.id === id
      );
      if (houseKeepingIndex !== -1) {
        state[houseKeepingIndex] = houseKeeping;
      }
    },
    deleteHouseKeeping: (state, action) => {
      return state.filter((houseKeeping) => houseKeeping.id !== action.payload.id);
    },
  },
});

export const { addHouseKeeping, updateHouseKeeping, deleteHouseKeeping } =
  houseKeepingSlice.actions;

export default houseKeepingSlice.reducer;