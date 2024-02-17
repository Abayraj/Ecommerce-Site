import express from 'express'
const router = express.Router();
import {registerUser,loginUsers,logOutUser, forgotPassword, resetPassword} from '../controllers/userController.js';


router.post('/register',registerUser)
router.post('/login',loginUsers)
router.get('/logout',logOutUser)
router.post('/password/forgot',forgotPassword)
router.put('/password/reset/:token',resetPassword)


export default router