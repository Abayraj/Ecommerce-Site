import express from "express";
const app = express();
//import all the routes
import product from "./routes/product.js";
import errorMiddleware from "./middlewares/errors.js";

app.use(express.json());

app.use("/api/v1", product);
app.use(errorMiddleware);

//middleware for handle errors


export default app;
