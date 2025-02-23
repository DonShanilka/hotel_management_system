import { ServiceUsage } from "../model/ServiceUsage.ts";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

const initialState:ServiceUsage[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveUsage = createAsyncThunk(
    '/sU/saveUsage',
    async (usageData:ServiceUsage)=>{
      try {
        const response = await api.post('/api/sU/saveUsage',usageData,{
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

export const updateUsage = createAsyncThunk(
    'sU/updateUsage',
    async (updateData) => {
      const id = updateData.usageID;  // Fix: Use direct property access
      console.log("Updating Usage with usageID :", id, updateData);

      try {
        const response = await api.put(`/api/sU/updateUsage/${id}`, updateData);
        return response.data;
      } catch (error) {
        console.error("Error updating Usage: ", error);
        throw error; // Ensure error propagates to rejected case
      }
    }
);

export const deleteUsage = createAsyncThunk(
    'sU/deleteUsage',
    async(uId : number) => {
      console.log("deleting uId: ", uId);
      try {
        await api.delete(`/api/sU/deleteUsage/${uId}`);
        return uId;
      } catch(err) {
        console.log(err);
      }
    }
);

const serviceUsageSlice = createSlice({
  name: "serviceUsages",
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

export default serviceUsageSlice.reducer;