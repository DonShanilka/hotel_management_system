import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Payment} from "../model/Payment.ts";
import axios from "axios";
import {Service} from "../model/Service.ts";

const initialState : Payment = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const savePayment = createAsyncThunk(
    'payment/savePayment',
    async (serviceData:Service)=>{
      try {
        const response = await api.post('/api/payment/savePayment', serviceData,{
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
});

export default paymentSlice.reducer;