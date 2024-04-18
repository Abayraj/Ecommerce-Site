import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
      
      },
      productid:{
        type:mongoose.Schema.ObjectId,
        ref:'product',
        required:true
      },

      color:String,
      quantity:String


})

const cart = mongoose.model("cart", cartSchema);

export default cart;