import { configureStore } from '@reduxjs/toolkit'; // Import only configureStore from @reduxjs/toolkit
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        products:productReducer,
        cart:cartReducer,     
        user:userReducer 
    },
  
});

export default store;



