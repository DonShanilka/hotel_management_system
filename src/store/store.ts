import {configureStore} from "@reduxjs/toolkit";
import roomReducer from '../reducer/RoomSlice.ts'

export const store = configureStore({
    reducer: {
        rooms: roomReducer
    }
})

export default store;