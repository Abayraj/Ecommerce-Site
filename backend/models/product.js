import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `please enter the product name`],
    trim: true,
    maxLength: [100, "product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "please enter a product price"],
    trim: true,
    maxLength: [5, "product price cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please select category for this product"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
        "Headphones"
      ],
      message: "please select correct category for product",
    },
  },
  seller: {
    type: String,
    required: [true, "please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [1000, "cannot show more than 1000 stock"],
    default: 0,
  },
  numberofReviews: {
    type: Number,
    default: 0,
  },

  reviews:[{
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
        
    },
    comment:{
        type:String,
        required:true

    }

  }
],
user:{
  type:mongoose.Schema.ObjectId,
  ref:'User',
  required:true

},
createdAt:{
    type:Date,
    default:Date.now
}
});

// Create the Mongoose model
const Product = mongoose.model("Product", productSchema);

// Export the model
export default Product;
