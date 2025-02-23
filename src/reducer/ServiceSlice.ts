import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { Service } from "../model/Service.ts";
import axios from "axios";

const initialState:Service[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveService = createAsyncThunk(
    '/service/saveService',
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