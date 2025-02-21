import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { Reservation } from '../model/Reservation';
import axios from "axios";

const initialState:Reservation[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveBooking = createAsyncThunk(
  'bo/saveBooking',
  async (boData:Reservation)=>{
    try {
      const response = await api.post('/api/bo/saveBooking',boData,{
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

export const updateBooking = createAsyncThunk(
'bo/updateBooking',
async (updateData) => {
  const id = updateData.bookingID;  // Fix: Use direct property access
  console.log("Updating Booking with bookingID :", id, updateData);

  try {
    const response = await api.put(`/api/bo/updateBooking/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating Booking:", error);
    throw error; // Ensure error propagates to rejected case
  }
}
);


export const deteleBooking = createAsyncThunk(
'bo/deleteBooking',
async(boId : number) => {
  console.log("deleting boId: ", boId);
  try {
    await api.delete(`/api/bo/deleteBookingn/${boId}`);
    return boId;
  } catch(err) {
    console.log(err);
  }
}
);

export const getallAccusation = createAsyncThunk(
'acc/getAllAccusation',
async() => {
  const response = await api.get('/api/acc/getAllAccusation');
  console.log("This is Slice data ",response.data)
  return response.data;
}
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: initialState,
  reducers: {
    // addReservation(state, action) {
    //   state.push(action.payload);
    // },
    // updateReservation: (state, action) => {
    //   const {id, reservation} = action.payload;
    //   const reservationIndex = state.findIndex(
    //     (reservation) => reservation.id === id
    //   );
    //   if (reservationIndex !== -1) {
    //     state[reservationIndex] = reservation;
    //   }
    // },
    // deleteReservation: (state, action) => {
    //   return state.filter((reservation) => reservation.id !== action.payload.id);
    // },
  },
});

export default reservationSlice.reducer;