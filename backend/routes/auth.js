import express from 'express'
const router = express.Router();
import {registerUser,loginUsers} from '../controllers/userController.js';


router.post('/register',registerUser)
router.post('/login',loginUsers)


export default router