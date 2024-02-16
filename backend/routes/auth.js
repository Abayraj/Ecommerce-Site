import express from 'express'
const router = express.Router();
import {registerUser,loginUsers,logOutUser} from '../controllers/userController.js';


router.post('/register',registerUser)
router.post('/login',loginUsers)
router.get('/logout',logOutUser)


export default router