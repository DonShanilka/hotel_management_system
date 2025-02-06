import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    addPayment(state, action) {
      state.push(action.payload);
    },
    updatePayment: (state, action) => {
      const {id, payment} = action.payload;
      const paymentIndex = state.findIndex(
        (payment) => payment.id === id
      );
      if (paymentIndex !== -1) {
        state[paymentIndex] = payment;
      }
    },
    deletePayment: (state, action) => {
      return state.filter((payment) => payment.id !== action.payload.id);
    },
  },
});

export const {addPayment, updatePayment, deletePayment} = paymentSlice.actions;
export default paymentSlice.reducer;