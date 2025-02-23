import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import { Employee } from '../model/Employee.ts';

const initialState:Employee[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveEmployee = createAsyncThunk(
    '/epm/saveEmployee',
    async (empData:Employee)=>{
      try {
        const response = await api.post('/api/epm/saveEmployee',empData,{
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
    'epm/updateEmployee',
    async (updateData) => {
        const id = updateData.employeeID;  // Fix: Use direct property access
        console.log("Updating guest with employeeID :", id, updateData);

        try {
            const response = await api.put(`/api/emp/updateEmployee/${id}`, updateData);
            return response.data;
        } catch (error) {
            console.error("Error updating guest:", error);
            throw error; // Ensure error propagates to rejected case
        }
    }
);

export const deteleEmployee = createAsyncThunk(
    'emp/deteleEmployee',
    async(empId : string) => {
        console.log("deleting boId: ", empId);
        try {
            await api.delete(`/api/emp/deteleEmployee/${empId}`);
            return empId;
        } catch(err) {
            console.log(err);
        }
    }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: initialState,
  reducers: {
    // addRoom(state, action) {
    //   state.push(action.payload);
    // },
    // updateRoom: (state, action) => {
    //   const {id, room} = action.payload;
    //   const roomIndex = state.findIndex(
    //     (room) => room.id === id
    //   );
    //   if (roomIndex !== -1) {
    //     state[roomIndex] = room;
    //   }
    // },
    // deleteRoom: (state, action) => {
    //   return state.filter((room) => room.id !== action.payload.id);
    // },
  },
  extraReducers:(builder)=>{
    builder
        .addCase(saveEmployee.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("Emp saved")
        })
        .addCase(saveEmployee.rejected,(state,action)=>{
          console.log("Emp Saved Rejected :",action.payload)
        })
        .addCase(saveEmployee.pending,()=>{
          console.log("Emp saving pending")
        })
  }
});

export default employeeSlice.reducer;