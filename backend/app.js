import express from "express";
const app = express();
//import all the routes
import product from "./routes/product.js";
import errorMiddleware from "./middlewares/errors.js";

app.use(express.json());
app.use("/api/v1", product);

//middleware for handle errors
app.use(errorMiddleware);

export default app;
