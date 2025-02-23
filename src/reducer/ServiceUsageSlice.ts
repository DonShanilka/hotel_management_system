import { ServiceUsage } from "../model/ServiceUsage.ts";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {Employee} from "../model/Employee.ts";

const initialState:ServiceUsage[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveServiceUsage = createAsyncThunk(
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