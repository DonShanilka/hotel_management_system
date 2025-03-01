import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import { Guest } from '../model/Guest';

const initialState:Guest[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveGuest = createAsyncThunk(
  'gu/saveGuest',
  async (guData:Guest)=>{
    try {
      const response = await api.post('/api/gu/saveGuest',guData,{
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

export const updateGuest = createAsyncThunk(
'gu/updateGuest',
async (updateData) => {
  const id = updateData.guestId; 
  console.log("Updating guest with guestId :", id, updateData);

  try {
    const response = await api.put(`/api/gu/updateGuest/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error; 
  }
}
);


export const deteleGuest = createAsyncThunk(
'gu/deleteGuest',
async(boId : string) => {
  console.log("deleting boId: ", boId);
  try {
    await api.delete(`/api/gu/deleteGuest/${boId}`);
    return boId;
  } catch(err) {
    console.log(err);
  }
}
);

export const getallGuest = createAsyncThunk(
'gu/getAllGuest',
async() => {
  const response = await api.get('/api/gu/getAllGuest');
  console.log("Get All Guest Data ",response.data)
  return response.data;
}
);

const guestSlice = createSlice({
  name: 'guest',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder
        .addCase(saveGuest.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("Guest saved")
        })
        .addCase(saveGuest.rejected,(state,action)=>{
          console.log("Guest Saved Rejected :",action.payload)
        })
        .addCase(saveGuest.pending,()=>{
          console.log("Guest saving pending")
        })

      builder
        .addCase(updateGuest.fulfilled, (state, action) => {
            const index = state.findIndex(guest => guest.guestId === action.payload.guestId);
            if (index !== -1) {
                state[index] = action.payload;
            }
            console.log("Guest Updated");
        })
        .addCase(updateGuest.rejected, (state, action) => {
            console.log("Failed to update Guest: ", action.error);
        })

    builder
        .addCase(deteleGuest.fulfilled,(state,action)=>{
          return state.filter(guest => guest.guestId !== action.payload);
        })
        .addCase(deteleGuest.rejected,(state,action)=>{
          console.log("Failed to delete Guest : ", action.payload)
        })

    builder
        .addCase(getallGuest.fulfilled,(state,action)=>{
          return action.payload;
        })
        .addCase(getallGuest.rejected,(state,action)=>{
          console.log("Failed to get Guest :", action.payload)
        })
        .addCase(getallGuest.pending,()=>{
          console.log("Fetching Guest ....")
        })
  }
});

export default guestSlice.reducer;

