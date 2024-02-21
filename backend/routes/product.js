import express from "express";
const router = express.Router();
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";
import {isAuthenticatedUser,authorizeRoles} from "../middlewares/auth.js"
router.get("/products",isAuthenticatedUser,authorizeRoles('admin'),getProducts);
router.post("/admin/product/new",isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.get("/product/:id", getSingleProduct);
router.put("/admin/product/:id", updateProduct,authorizeRoles);
router.delete("/admin/product/:id", deleteProduct)
.put(isAuthenticatedUser,updateProduct,authorizeRoles)
.delete(isAuthenticatedUser,authorizeRoles,deleteProduct,)
router.put("/review",isAuthenticatedUser,createProductReview);

export default router;
