import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { HouseKeeping } from "../model/HouseKeeping";
import axios from "axios";

const initialState:HouseKeeping[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveHouseKeeping = createAsyncThunk(
    'hk/saveHouseKeeping',
    async (hkData:HouseKeeping)=>{
      try {
        const response = await api.post('/api/hk/saveHouseKeeping',hkData,{
          headers:{
            "Content-Type" : "multipart/form-data"
          },
        });
        console.log(response.data);
        return response.data;
      }catch(error){
        console.log(error);
      }
    }
);

export const updateHouseKeeping = createAsyncThunk(
    'hk/updateHouseKeeping',
    async (updateData) => {
      const id = updateData.houseKeepingId;  // Fix: Use direct property access
      console.log("Updating HouseKeeping with HouseKeepingId :", id, updateData);

      try {
        const response = await api.put(`/api/hk/updateHouseKeeping/${id}`, updateData);
        return response.data;
      } catch (error) {
        console.error("Error updating HouseKeeping:", error);
        throw error; // Ensure error propagates to rejected case
      }
    }
);


export const deleteHouseKeeping = createAsyncThunk(
    'hk/deleteHouseKeeping',
    async(hkId : number) => {
      console.log("deleting HouseKeeping Id: ", hkId);
      try {
        await api.delete(`/api/hk/deleteHouseKeeping/${hkId}`);
        return hkId;
      } catch(err) {
        console.log(err);
      }
    }
);

export const getallHouseKeeping = createAsyncThunk(
    'hk/getAllHouseKeeping',
    async() => {
      const response = await api.get('/api/hk/getAllHouseKeeping');
      console.log("Get All HouseKeeping Data ",response.data)
      return response.data;
    }
);

const houseKeepingSlice = createSlice({
  name: 'houseKeeping',
  initialState: initialState,
  reducers: {
    // addHouseKeeping(state, action) {
    //   state.push(action.payload);
    // },
    // updateHouseKeeping: (state, action) => {
    //   const { id, houseKeeping } = action.payload;
    //   const houseKeepingIndex = state.findIndex(
    //     (houseKeeping) => houseKeeping.id === id
    //   );
    //   if (houseKeepingIndex !== -1) {
    //     state[houseKeepingIndex] = houseKeeping;
    //   }
    // },
    // deleteHouseKeeping: (state, action) => {
    //   return state.filter((houseKeeping) => houseKeeping.id !== action.payload.id);
    // },
  },
  extraReducers:(builder)=>{
    builder
        .addCase(saveHouseKeeping.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("HouseKeeping saved")
        })
        .addCase(saveHouseKeeping.rejected,(state,action)=>{
          console.log("HouseKeeping Saved Rejected :",action.payload)
        })
        .addCase(saveHouseKeeping.pending,()=>{
          console.log("HouseKeeping saving pending")
        })

    builder
        .addCase(updateHouseKeeping.fulfilled, (state, action) => {
          const index = state.findIndex(houseKeeping => houseKeeping.houseKeepingId === action.payload.houseKeepingId);
          if (index !== -1) {
            state[index] = action.payload;
          }
          console.log("HouseKeeping Updated");
        })
        .addCase(updateHouseKeeping.rejected, (state, action) => {
          console.log("Failed to update HouseKeeping: ", action.error);
        });

    builder
        .addCase(deleteHouseKeeping.fulfilled,(state,action)=>{
          return state.filter(houseKeeping => houseKeeping.houseKeepingId !== action.payload);
        })
        .addCase(deleteHouseKeeping.rejected,(_state,action)=>{
          console.log("Failed to delete HouseKeeping : ", action.payload)
        })

    builder
        .addCase(getallHouseKeeping.fulfilled, (state, action) => {
              return action.payload || []; // Ensure it always returns an array
        })
        .addCase(getallHouseKeeping.rejected,(state,action)=>{
          console.log("Failed to get HouseKeeping :", action.payload)
        })
        .addCase(getallHouseKeeping.pending,()=>{
          console.log("Fetching HouseKeeping ....")
        })
  }
});

export default houseKeepingSlice.reducer;