import express from "express";
import cookieParser from "cookie-parser";
const app = express();
//import all the routes products
import products from "./routes/product.js";
import errorMiddleware from "./middlewares/errors.js";
import auth from "./routes/auth.js";


app.use(express.json());
app.use(cookieParser());  

app.use("/api/v1", products);
app.use("/api/v1",auth);
app.use(errorMiddleware);

//middleware for handle errors


export default app;
