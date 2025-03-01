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
  const id = updateData.bookingID;  
  console.log("Updating Booking with bookingID :", id, updateData);

  try {
    const response = await api.put(`/api/bo/updateBooking/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating Booking:", error);
    throw error; 
  }
}
);


export const deteleBooking = createAsyncThunk(
'bo/deleteBooking',
async(boId : number) => {
  console.log("deleting boId: ", boId);
  try {
    await api.delete(`/api/bo/deleteBooking/${boId}`);
    return boId;
  } catch(err) {
    console.log(err);
  }
}
);

export const getallBooking = createAsyncThunk(
'bo/getAllBooking',
async() => {
  const response = await api.get('/api/bo/getAllBooking');
  console.log("This is Slice data ",response.data)
  return response.data;
}
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder
        .addCase(saveBooking.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("Bo saved")
        })
        .addCase(saveBooking.rejected,(state,action)=>{
          console.log("Bo Saved Rejected :",action.payload)
        })
        .addCase(saveBooking.pending,()=>{
          console.log("Bo saving pending")
        })

        builder
        .addCase(updateBooking.fulfilled, (state, action) => {
            const index = state.findIndex(bo => bo.bookingID === action.payload.bookingID);
            if (index !== -1) {
                state[index] = action.payload;
            }
            console.log("Bo Updated");
        })
        .addCase(updateBooking.rejected, (state, action) => {
            console.log("Failed to update Bo: ", action.error);
        });

    builder
        .addCase(deteleBooking.fulfilled,(state,action)=>{
          return state.filter(bo => bo.bookingID !== action.payload);
        })
        .addCase(deteleBooking.rejected,(state,action)=>{
          console.log("Failed to delete Bo : ", action.payload)
        })

    builder
        .addCase(getallBooking.fulfilled,(state,action)=>{
          return action.payload;
        })
        .addCase(getallBooking.rejected,(state,action)=>{
          console.log("Failed to get Bo :", action.payload)
        })
        .addCase(getallBooking.pending,()=>{
          console.log("Fetching Bo ....")
        })
  }
});

export default reservationSlice.reducer;