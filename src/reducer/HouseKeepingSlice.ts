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


export const deteleHouseKeeping = createAsyncThunk(
    'hk/deleteHouseKeeping',
    async(hkId : string) => {
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
  name: "houseKeeping",
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
});

export default houseKeepingSlice.reducer;