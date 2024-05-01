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


export const incrementCartItem = createAsyncThunk(
  "cart/incrementCartItem",
  async (cartItem) => {
    try {
      // Make API call to update quantity in database
   console.log(cartItem)
      await api.put(`/usercart/${cartItem.cartItemId}`,{quantity:cartItem.itemQuantity+1});
   
      return cartItem.cartItemId;
     
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const decrementCartItem = createAsyncThunk(
  "cart/decrementCartItem",
  async (cartItem) => {
    try {
      // Make API call to update quantity in database
      await api.put(`/usercart/${cartItem.cartItemId}`,{quantity:cartItem.itemQuantity-1});
      return cartItem.cartItemId;
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
      })

      .addCase(incrementCartItem.fulfilled, (state, action) => {
        const  _id = action.payload;
        console.log(action.payload)
        console.log("Cart ID in incrementCartItem:", _id); // Log the _id
        state.cart = state.cart.map(item => {
          console.log("Item ID in incrementCartItem map:", item._id); // Log the item._id
          return item._id === _id ? { ...item, quantity: item.quantity + 1 } : item;
        });
      })
      
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        const  _id = action.payload;
        state.cart = state.cart.map(item =>
          item._id === _id && item.quantity>1 ? { ...item, quantity: item.quantity - 1 } : item
        );
      });
  }
});

export default cartSlice.reducer;
