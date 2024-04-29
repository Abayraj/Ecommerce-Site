import mongoose from "mongoose";
import Product from ".././models/product.js"

const cartSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
      
      },
      productid:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
      },
      color:String,
    
      quantity:Number,



});

const Cart = mongoose.model("cart", cartSchema);
export default Cart;