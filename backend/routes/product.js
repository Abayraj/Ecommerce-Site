import express from "express";
const router = express.Router();
import {
  getProducts,
  newProduct,

  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

router.get("/products", getProducts);
router.post("/admin/product/new", newProduct);
router.get("/product/:id", getSingleProduct);
router.put("/admin/product/:id", updateProduct);
router.delete("/admin/product/:id", deleteProduct)
.put(updateProduct)
.delete(deleteProduct);

export default router;
