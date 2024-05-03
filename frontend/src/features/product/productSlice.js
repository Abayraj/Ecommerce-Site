import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../components/api/api_instance";

export const getallProducts  = createAsyncThunk("getallProducts",async()=>{
  try {
    const response = await api.get('/Products') // it will returning a data but also its a promise pending fulfilled rejected

    console.log(response.data)
    return response.data.products; 
  } catch (error) {
    throw error;
    
  }
})

export const singleproductDetails = createAsyncThunk("singleproductDetails",async(id)=>{
  console.log(id,"idd from slice")
  try{
    const response = await api.get(`/product/${id}`)
    console.log(response,"hello")
    return  response.data.product;
    
  }
  catch(error){
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
      })
      .addCase(singleproductDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(singleproductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.products =  [action.payload];
        state.count = action.payload.length
      })
      .addCase(singleproductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
  
});

export default productSlice.reducer;
