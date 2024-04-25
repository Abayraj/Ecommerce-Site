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
    
      quantity:Number,
      // productName: {
      //   type: String,
      //   required: [true, `please enter the product name`],
      //   trim: true,
      //   maxLength: [100, "product name cannot exceed 100 characters"],
      // },
      // price: {
      //   type: Number,
      //   required: [true, "please enter a product price"],
      //   trim: true,
      //   maxLength: [5, "product price cannot exceed 5 characters"],
      //   default: 0.0,
      // },
      // description: {
      //   type: String,
      //   required: [true, "please enter product description"],
      // },


});

const cart = mongoose.model("cart", cartSchema);

export default cart;