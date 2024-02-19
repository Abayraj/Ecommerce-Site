import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUsers,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
 import {isAuthenticatedUser,authorizeRoles} from "../middlewares/auth.js"

router.post("/register", registerUser);
router.post("/login", loginUsers);
router.get("/logout", logOutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me",isAuthenticatedUser,getUserProfile);
router.put("/password/update",isAuthenticatedUser,updatePassword);
router.put("/me/update",isAuthenticatedUser,updateProfile);

router.get("/admin/users",isAuthenticatedUser,authorizeRoles('admin'),allUsers);
router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
.put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)



export default router;
