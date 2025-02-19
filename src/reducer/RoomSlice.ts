import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Room} from "../model/Room.ts";
import axios from "axios";
import { log } from 'console';

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
            "Content-Type" : "multipart/form-data"
          },
        });
        return response.data;
      }catch(error){
        console.log(error);
      }
    }
)
export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async(roomData)=>{
    try{
      const roomNumber = roomData.get("roomNumber");
      console.log("Updating room with room :",roomNumber);

      const response = await api.put(`/api/room/updateRoom/${roomNumber}`,roomData,{
        headers:{
          "Content-Type" : "multipart/form-data"
        },
      });
      return response.data;
    }catch(err){
      console.log("Update Room with error :", err);
    }
  }
)

export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async(roomNumber:string)=>{
    console.log(roomNumber)
    try{
      await api.delete(`/api/room/deleteRoom/${roomNumber}`);
      return roomNumber;
    }catch(err){
      console.log(err)
    }
  }
)

export const getAllRoom = createAsyncThunk(
  'room/getAllRoom',
  async()=>{
    const response = await api.get('/api/room/getAllRoom');
    return response.data;
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

        builder
        .addCase(updateRoom.fulfilled,(state,action)=>{
          const index = state.findIndex(room => room.roomNumber === action.payload.roomNumber);
          if(index !== -1){
            state[index] = action.payload;
          }
          console.log("Room Updated");
        })
        .addCase(updateRoom.rejected,(state,action)=>{
          console.log("Failed to Update Room :",action.payload)
        })
        .addCase(updateRoom.pending,()=>{
          console.log("Room Updating Pending")
        })

        builder
        .addCase(deleteRoom.fulfilled,(state,action)=>{
          return state.filter(room => room.roomNumber !== action.payload);
        })
        .addCase(deleteRoom.rejected,(state,action)=>{
          console.log("Failed to delete Room : ", action.payload)
        })

        builder
        .addCase(getAllRoom.fulfilled,(state,action)=>{
          return action.payload;
        })
        .addCase(getAllRoom.rejected,(state,action)=>{
          console.log("Failed to get Room :", action.payload)
        })
        .addCase(getAllRoom.pending,()=>{
          console.log("Fetching Room  ....")
        })
  }
});
export default roomSlice.reducer;