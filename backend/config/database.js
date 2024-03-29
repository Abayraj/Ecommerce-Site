import mongoose from "mongoose";


const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      w: 'majority',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); 
  }
};

export default connectDatabase





