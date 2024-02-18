import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUsers,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword
} from "../controllers/userController.js";
 import {isAuthenticatedUser} from "../middlewares/auth.js"

router.post("/register", registerUser);
router.post("/login", loginUsers);
router.get("/logout", logOutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me",isAuthenticatedUser,getUserProfile);
router.put("/password/update",isAuthenticatedUser,updatePassword);

export default router;
