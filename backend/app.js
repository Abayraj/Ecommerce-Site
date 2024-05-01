import express from "express";
import cookieParser from "cookie-parser";
const app = express();
//import all the routes products
import products from "./routes/product.js";
import errorMiddleware from "./middlewares/errors.js";
import auth from "./routes/auth.js";
import order from "./routes/order.js";
import cart from "./routes/cart.js";
import cors from 'cors';



  
// Enable CORS with options
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials
}));
// app.use((req, res, next) => {
  
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you're using credentials (e.g., cookies)
  
//   next();
// });


app.use(express.json());
app.use(cookieParser());  



app.use("/api/v1",auth,products,order,cart);
app.use(errorMiddleware);

//middleware for handle errors


export default app;
