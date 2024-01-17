import mongoose from "mongoose";

// MongoDB connection URI


// Connect to MongoDB
const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
}

// Get the default connection
const db = mongoose.connection;

// Event handling for successful connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event handling for connection error
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});


export default connectDatabase
