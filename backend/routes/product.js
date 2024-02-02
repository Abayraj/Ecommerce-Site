import express from "express";
const router = express.Router();
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

router.route("/products").get(getProducts);
router.route("admin/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct);


export default router;
