import express from "express";
const router = express.Router();
import { getProducts,newProduct,getSingleProduct} from '../controllers/productController.js';

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProduct);



export default router;




