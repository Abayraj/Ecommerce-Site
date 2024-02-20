import express from"express"
import { isAuthenticatedUser,authorizeRoles} from "../middlewares/auth.js"
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
const router = express.Router();


router.post("/order/new",isAuthenticatedUser,newOrder);
router.get("/order/:id",isAuthenticatedUser,getSingleOrder);
router.get("/orders/me",isAuthenticatedUser,myOrders);

router.get("/admin/orders",isAuthenticatedUser,authorizeRoles('admin'),allOrders);
router.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);



export default router;

