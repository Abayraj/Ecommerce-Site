import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getallProducts  = createAsyncThunk("getProducts",async()=>{
  const response = await axios.get('/api/v1/products') // it will returning a data but also its a promise pending fulfilled rejected
  return response
})





const productSlice = createSlice({
  name: "getProducts",
  initialState : {
    products: [],
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
      })
      .addCase(getallProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
  
});

export default productSlice.reducer;
