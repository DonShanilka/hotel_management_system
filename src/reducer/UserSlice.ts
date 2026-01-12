import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import {User} from '../model/User'
import axios from "axios";

const initialState={
  user:null,
  error:null,
};

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const saveUser = createAsyncThunk(
  'auth/addUser',
  async(userData:User)=>{
    try{
      const response = await api.post('/api/auth/addUser', {
        userEmail: userData.userEmail,
        password: userData.password,
        rolle: userData.rolle
    });
    return response.data;
    }catch(err){
      console.log(err)
    }
  }
)


export const loginAuth = createAsyncThunk(
  'auth/login',
  async(user:User)=>{
    try{
      const response = await api.post('/api/auth/login',{
        userEmail:user.userEmail,
        password:user.password,
        rolle:user.rolle
      });
      return response.data;
    }catch(err){
      console.log("user Authentication failed")
    }
  }
)

const userSlice = createSlice({
  name:'users',
  initialState:initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
    .addCase(saveUser.fulfilled,(state,action)=>{
    
      console.log("User Saved Successfully")
    })
    .addCase(saveUser.rejected,(state,action)=>{
      console.log("User Saving Rejected :",action.payload)
    })
    .addCase(saveUser.pending,()=>{
      console.log('User Save Pending')
    })

    builder
    .addCase(loginAuth.fulfilled,(state,action)=>{
      state.user = action.payload;
      state.error = null;
    })
    .addCase(loginAuth.rejected,(state,action)=>{
      state.error = action.payload;
      console.log("Login failed:",action.payload)
    })
  }
})

export default userSlice.reducer;