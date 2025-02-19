import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Room} from "../model/Room.ts";
import axios from "axios";

const initialState:Room[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const saveRooms = createAsyncThunk(
    'room/saveRoom',
    async (roomData:Room)=>{
      try {
        const response = await api.post('/api/room/saveRoom',roomData,{
          headers:{
            "Content-Type":"multipart/form-data"
          },
        });
        return response.data;
      }catch(error){
        console.log(error);
      }
    }
)
const roomSlice = createSlice({
  name: 'rooms',
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
        .addCase(saveRooms.fulfilled,(state,action)=>{
          state.push(action.payload);
          console.log("Room saved")
        })
        .addCase(saveRooms.rejected,(state,action)=>{
          console.log("Room Saved Rejected :",action.payload)
        })
        .addCase(saveRooms.pending,()=>{
          console.log("Room saving pending")
        })
  }
});
export default roomSlice.reducer;