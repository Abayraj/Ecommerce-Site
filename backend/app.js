import express from "express";
import cookieParser from "cookie-parser";
const app = express();
//import all the routes products
import products from "./routes/product.js";
import errorMiddleware from "./middlewares/errors.js";
import auth from "./routes/auth.js";
import order from "./routes/order.js";


app.use(express.json());
app.use(cookieParser());  

app.use("/api/v1", products,auth,order);
app.use(errorMiddleware);

//middleware for handle errors


export default app;
