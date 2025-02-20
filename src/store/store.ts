import {configureStore} from "@reduxjs/toolkit";
import roomReducer from '../reducer/RoomSlice.ts'
import resReducer from '../reducer/ReservationSlice.ts'
import guestReducer from '../reducer/GuestSlice.ts'
import houseReducer from '../reducer/HouseKeepingSlice.ts'
import paymentReducer from '../reducer/PaymentSlice.ts'
import accuReducer from '../reducer/AccusationSlice.ts'
import employeeReducer from '../reducer/EmployeeSlice.ts'
import serviceReducer from '../reducer/ServiceSlice.ts'
import usageReducer from '../reducer/ServiceUsage.ts'

export const store = configureStore({
    reducer: {
        rooms: roomReducer,
        reservations : resReducer,
        guests : guestReducer,
        houseKeepings : houseReducer,
        payments : paymentReducer,
        accusations : accuReducer,
        employyes : employeeReducer,
        service : serviceReducer,
        serviceUsages : usageReducer
    }
})

export default store;