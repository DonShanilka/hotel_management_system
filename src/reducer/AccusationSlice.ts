import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import { Accusation } from '../model/Accusation.ts';

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
    async(accData) => {
      try {
        const accId = accData.get("AccId");
        console.log("Updating Acc with AccId: ",accId);

        const response = await api.put(`/api/acc/updateAccusation/${accId}`, accData, {
          headers : {
            "Content-Type" : "multipart/form-data"
          },
        });
        return response.data;
      } catch (err) {
        console.log("Acc Update Erro: ", err);
      }
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
  }
});
export default accusationsSlice.reducer;