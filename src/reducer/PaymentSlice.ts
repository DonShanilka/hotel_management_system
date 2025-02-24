import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Payment} from "../model/Payment.ts";
import axios from "axios";

const initialState : Payment[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const savePayment = createAsyncThunk(
    'payment/savePayment',
    async (paymentData:Payment)=>{
      try {
        const response = await api.post('/api/payment/savePayment', paymentData,{
          headers:{
            "Content-Type" : "multipart/form-data"
          },
        });
        return response.data;
      }catch(error){
        console.log(error);
      }
    }
);

export const updatePayment = createAsyncThunk(
    'payment/updatePayment',
    async (updateData) => {
      const id = updateData.paymentId;  // Fix: Use direct property access
      console.log("Updating Payment with paymentId :", id, updateData);

      try {
        const response = await api.put(`/api/payment/updatePayment/${id}`, updateData);
        return response.data;
      } catch (error) {
        console.error("Error updating Payment:", error);
        throw error; // Ensure error propagates to rejected case
      }
    }
);

export const deletePayment = createAsyncThunk(
    'payment/deletePayment',
    async(paymentId : number) => {
      console.log("deleting empId: ", paymentId);
      try {
        await api.delete(`/api/payment/deletePayment/${paymentId}`);
        return paymentId;
      } catch(err) {
        console.log(err);
      }
    }
);

export const getAllPayment = createAsyncThunk(
    'payment/getAllPayment',
    async() => {
      const response = await api.get('/api/payment/getAllPayment');
      console.log("Get All Service Data ",response.data)
      return response.data;
    }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    // addPayment(state, action) {
    //   state.push(action.payload);
    // },
    // updatePayment: (state, action) => {
    //   const {id, payment} = action.payload;
    //   const paymentIndex = state.findIndex(
    //     (payment) => payment.id === id
    //   );
    //   if (paymentIndex !== -1) {
    //     state[paymentIndex] = payment;
    //   }
    // },
    // deletePayment: (state, action) => {
    //   return state.filter((payment) => payment.id !== action.payload.id);
    // },
  },
  extraReducers:(builder)=>{
    builder
        .addCase(savePayment.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("Payment saved")
        })
        .addCase(savePayment.rejected,(state,action)=>{
          console.log("Payment Saved Rejected :",action.payload)
        })
        .addCase(savePayment.pending,()=>{
          console.log("Payment saving pending")
        })

    builder
        .addCase(updatePayment.fulfilled, (state, action) => {
          const index = state.findIndex(payment => payment.paymentId === action.payload.paymentId);
          if (index !== -1) {
            state[index] = action.payload;
          }
          console.log("Payment Updated");
        })
        .addCase(updatePayment.rejected, (state, action) => {
          console.log("Failed to update Payment: ", action.error);
        })

    builder
        .addCase(deletePayment.fulfilled,(state,action)=>{
          return state.filter(payment => payment.paymentId !== action.payload);
        })
        .addCase(deletePayment.rejected,(state,action)=>{
          console.log("Failed to delete Payment : ", action.payload)
        })

    builder
        .addCase(getAllPayment.fulfilled,(state,action)=>{
          return action.payload;
        })
        .addCase(getAllPayment.rejected,(state,action)=>{
          console.log("Failed to get Payment :", action.payload)
        })
        .addCase(getAllPayment.pending,()=>{
          console.log("Fetching Payment ....")
        })
  }
});

export default paymentSlice.reducer;