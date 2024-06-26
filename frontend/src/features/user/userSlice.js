import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../components/api/api_instance";


export const currentUser = createAsyncThunk("getcurrentuserDetails",async()=>{
    try {
      const response = await api.get('/me') // it will returning a data but also its a promise pending fulfilled rejected
      console.log(response.data.user)
      return response.data.user; 
    } catch (error) {
      console.log(error)
      throw error;
      
    }
  })

  export const logoutUser = () => {
    return { type: 'user/logout' }; // Action to logout user
  };

  export const userSlice = createSlice({
    name: "user", 
    initialState:{
      user:[],
      loading: false,
      error: null,
    
    },
    
    extraReducers: builder => {
      builder
        .addCase(currentUser.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(currentUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
      
        })
        .addCase(currentUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase('user/logout', (state, action) => {
          state.user = []; // Set user to empty array on logout
        });
    }
  
});


export default userSlice.reducer;