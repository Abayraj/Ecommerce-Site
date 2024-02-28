import express from "express";
const router = express.Router();
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
router.get(
  "/products",

  getProducts
);

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router.get("/product/:id", getSingleProduct);
router.put("/admin/product/:id", updateProduct, authorizeRoles("admin"));
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct, authorizeRoles("admin"))
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/review")
  .put(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

export default router;
