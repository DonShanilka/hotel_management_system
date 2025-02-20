import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import { Accusation } from '../model/Accusation.ts';
import { updateReservation } from './ReservationSlice.ts';

const initialState:Accusation[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveAccusation = createAsyncThunk(
    'acc/saveAccusation',
    async (accData:Accusation)=>{
      try {
        const response = await api.post('/api/acc/saveAccusation',accData,{
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

export const updateAccusation = createAsyncThunk(
  'acc/updateAccusation',
  async (updateData) => {
    const id = updateData.accusationId;  // Fix: Use direct property access
    console.log("Updating Acc with AccId :", id, updateData);

    try {
      const response = await api.put(`/api/acc/updateAccusation/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("Error updating accusation:", error);
      throw error; // Ensure error propagates to rejected case
    }
  }
);



export const deteleAccusation = createAsyncThunk(
  'acc/deleteAccusation',
  async(accId : number) => {
    console.log("deleting AccId: ", accId);
    try {
      await api.delete(`/api/acc/deleteAccusation/${accId}`);
      return accId;
    } catch(err) {
      console.log(err);
    }
  }
);

export const getallAccusation = createAsyncThunk(
  'acc/getAllAccusation',
  async() => {
    const response = await api.get('/api/acc/getAllAccusation');
    console.log("This is Slice data ",response.data)
    return response.data;
  }
);

const accusationsSlice = createSlice({
  name: 'accusations',
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
        .addCase(saveAccusation.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("Acc saved")
        })
        .addCase(saveAccusation.rejected,(state,action)=>{
          console.log("Acc Saved Rejected :",action.payload)
        })
        .addCase(saveAccusation.pending,()=>{
          console.log("Acc saving pending")
        })

        builder
        .addCase(updateAccusation.fulfilled, (state, action) => {
            const index = state.findIndex(acc => acc.accusationId === action.payload.accusationId);
            if (index !== -1) {
                state[index] = action.payload;
            }
            console.log("Accusation Updated");
        })
        .addCase(updateAccusation.rejected, (state, action) => {
            console.log("Failed to update Accusation: ", action.error);
        });

    builder
        .addCase(deteleAccusation.fulfilled,(state,action)=>{
          return state.filter(acc => acc.accusationId !== action.payload);
        })
        .addCase(deteleAccusation.rejected,(state,action)=>{
          console.log("Failed to delete Acc : ", action.payload)
        })

    builder
        .addCase(getallAccusation.fulfilled,(state,action)=>{
          return action.payload;
        })
        .addCase(getallAccusation.rejected,(state,action)=>{
          console.log("Failed to get Acc :", action.payload)
        })
        .addCase(getallAccusation.pending,()=>{
          console.log("Fetching Acc  ....")
        })
  }
});
export default accusationsSlice.reducer;