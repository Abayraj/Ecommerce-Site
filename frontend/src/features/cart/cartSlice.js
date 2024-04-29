import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../components/api/api_instance';


export const getuserCartProducts = createAsyncThunk(
  "cart/getuserCartProducts",
  async () => {
    try {
      const response = await api.get('/usercart')
      console.log(response.data.userCartProducts)
       return response.data.userCartProducts;
      
    } catch (error) {
      throw error;
    }
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart:[],
    loading: false,
    error: null,
    count: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getuserCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getuserCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.count = action.payload.length;
      })
      .addCase(getuserCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default cartSlice.reducer;
