import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import { Employee } from '../model/Employee.ts';

const initialState:Employee[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveEmployee = createAsyncThunk(
    '/emp/saveEmployee',
    async (empData:Employee)=>{
      try {
        const response = await api.post('/api/emp/saveEmployee',empData,{
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

export const updateEmployee = createAsyncThunk(
    'emp/updateEmployee',
    async (updateData) => {
        const id = updateData.employeeID;  
        console.log("Updating guest with employeeID :", id, updateData);

        try {
            const response = await api.put(`/api/emp/updateEmployee/${id}`, updateData);
            return response.data;
        } catch (error) {
            console.error("Error updating guest:", error);
            throw error;
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'emp/deleteEmployee',
    async(empId : string) => {
        console.log("deleting empId: ", empId);
        try {
            await api.delete(`/api/emp/deleteEmployee/${empId}`);
            return empId;
        } catch(err) {
            console.log(err);
        }
    }
);

export const getallEmployee = createAsyncThunk(
    'emp/getAllEmployee',
    async() => {
        const response = await api.get('/api/emp/getAllEmployee');
        console.log("Get All Employee Data ",response.data)
        return response.data;
    }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: initialState,
  reducers: {
    
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

      builder
          .addCase(updateEmployee.fulfilled, (state, action) => {
              const index = state.findIndex(emp => emp.employeeID === action.payload.employeeID);
              if (index !== -1) {
                  state[index] = action.payload;
              }
              console.log("Employee Updated");
          })
          .addCase(updateEmployee.rejected, (state, action) => {
              console.log("Failed to update Employee: ", action.error);
          })

      builder
          .addCase(deleteEmployee.fulfilled,(state,action)=>{
              return state.filter(emp => emp.employeeID !== action.payload);
          })
          .addCase(deleteEmployee.rejected,(state,action)=>{
              console.log("Failed to delete Employee : ", action.payload)
          })

      builder
          .addCase(getallEmployee.fulfilled,(state,action)=>{
              return action.payload;
          })
          .addCase(getallEmployee.rejected,(state,action)=>{
              console.log("Failed to get Employee :", action.payload)
          })
          .addCase(getallEmployee.pending,()=>{
              console.log("Fetching Employee ....")
          })
  }
});

export default employeeSlice.reducer;