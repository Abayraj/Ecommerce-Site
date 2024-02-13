import User from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js"
import jwt from 'jsonwebtoken'
//Checks if user is authenticated or not

export const isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies
    console.log(token);

    if(!token){
        return next(new ErrorHandler('Login to access the resource ',404))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})