import { createSlice } from "@reduxjs/toolkit";
import { Employee } from "../model/Employee.ts";

const initialState:Employee[] = [];

const employeeSlice = createSlice({
  name: "employyes",
  initialState: initialState,
  reducers: {
    // addAccusation(state, action) {
    //   state.push(action.payload);
    // },
    // updateAccusation: (state, action) => {
    //   const { id, accusation } = action.payload;
    //   const accusationIndex = state.findIndex(
    //     (accusation) => accusation.id === id
    //   );
    //   if (accusationIndex !== -1) {
    //     state[accusationIndex] = accusation;
    //   }
    // },
    // deleteAccusation: (state, action) => {
    //   return state.filter((accusation) => accusation.id !== action.payload.id);
    // },
  },
});

export default employeeSlice.reducer;