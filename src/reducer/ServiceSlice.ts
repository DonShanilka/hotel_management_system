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
        console.error("Error updating Service:", error);
        throw error; // Ensure error propagates to rejected case
      }
    }
);

export const deleteService = createAsyncThunk(
    'service/deleteService',
    async(serviceId : number) => {
      console.log("deleting empId: ", serviceId);
      try {
        await api.delete(`/api/service/deleteService/${serviceId}`);
        return serviceId;
      } catch(err) {
        console.log(err);
      }
    }
);

export const getAllService = createAsyncThunk(
    'service/getAllService',
    async() => {
      const response = await api.get('/api/service/getAllService');
      console.log("Get All Service Data ",response.data)
      return response.data;
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
  extraReducers:(builder)=>{
    builder
        .addCase(saveService.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("Service saved")
        })
        .addCase(saveService.rejected,(state,action)=>{
          console.log("Service Saved Rejected :",action.payload)
        })
        .addCase(saveService.pending,()=>{
          console.log("Service saving pending")
        })

    builder
        .addCase(updateService.fulfilled, (state, action) => {
          const index = state.findIndex(service => service.serviceID === action.payload.serviceID);
          if (index !== -1) {
            state[index] = action.payload;
          }
          console.log("Service Updated");
        })
        .addCase(updateService.rejected, (state, action) => {
          console.log("Failed to update Service: ", action.error);
        })

    builder
        .addCase(deleteService.fulfilled,(state,action)=>{
          return state.filter(service => service.serviceID !== action.payload);
        })
        .addCase(deleteService.rejected,(state,action)=>{
          console.log("Failed to delete Service : ", action.payload)
        })

    builder
        .addCase(getAllService.fulfilled,(state,action)=>{
          return action.payload;
        })
        .addCase(getAllService.rejected,(state,action)=>{
          console.log("Failed to get Service :", action.payload)
        })
        .addCase(getAllService.pending,()=>{
          console.log("Fetching Service ....")
        })
  }
});

export default serviceSlice.reducer;