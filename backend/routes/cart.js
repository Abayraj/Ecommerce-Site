import express from"express"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { cartAdd, cartItemsQuantityUpdate, getUserCartProducts } from "../controllers/cartController.js";

router.post("/cart", isAuthenticatedUser,cartAdd)
router.get("/usercart",isAuthenticatedUser,getUserCartProducts)
router.put(`/usercart/:cartId`,isAuthenticatedUser,cartItemsQuantityUpdate)


export default router;