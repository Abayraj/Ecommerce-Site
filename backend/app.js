import express from "express";
const app = express();
app.use(express.json());
//import all the routes
import product from './routes/product.js';


app.use('/api/v1',product)

export default app
