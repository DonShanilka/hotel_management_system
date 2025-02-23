import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { Service } from "../model/Service.ts";
import axios from "axios";

const initialState:Service[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveService = createAsyncThunk(
    'service/saveService',
    async (serviceData:Service)=>{
      try {
        const response = await api.post('/api/service/saveService', serviceData,{
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

export const updateService = createAsyncThunk(
    'service/updateService',
    async (updateData) => {
      const id = updateData.serviceID;  // Fix: Use direct property access
      console.log("Updating Service with serviceID :", id, updateData);

      try {
        const response = await api.put(`/api/service/updateService/${id}`, updateData);
        return response.data;
      } catch (error) {
        console.error("Error updating guest:", error);
        throw error; // Ensure error propagates to rejected case
      }
    }
);

export const deleteEmployee = createAsyncThunk(
    'service/deleteService',
    async(serviceId : string) => {
      console.log("deleting empId: ", serviceId);
      try {
        await api.delete(`/api/service/deleteService/${serviceId}`);
        return serviceId;
      } catch(err) {
        console.log(err);
      }
    }
);

const serviceSlice = createSlice({
  name: "service",
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

export default serviceSlice.reducer;