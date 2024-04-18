import express from"express"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { cartAdd } from "../controllers/cartController.js";

router.post("/cart",isAuthenticatedUser,cartAdd)