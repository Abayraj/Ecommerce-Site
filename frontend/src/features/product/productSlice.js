import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const getallProducts  = createAsyncThunk("getProducts",async()=>{
  try {
    const response = await axios.get('http://localhost:4000/api/v1/Products') // it will returning a data but also its a promise pending fulfilled rejected
    console.log(response.data)
    return response.data.products; 
  } catch (error) {
    throw error;
    
  }
 
})
 export const productSlice = createSlice({
  name: "getProducts", 
  initialState:{
    products:[],
    loading: false,
    error: null,
    count: 0,
  },
  extraReducers: builder => {
    builder
      .addCase(getallProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.count = action.payload.length
      })
      .addCase(getallProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
  
});

export default productSlice.reducer;
