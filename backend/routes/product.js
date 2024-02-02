import express from "express";
const router = express.Router();
import { getProducts,newProduct} from '../controllers/productController.js';

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);



export default router;




