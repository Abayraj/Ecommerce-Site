import User from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js"
import jwt from 'jsonwebtoken'
//Checks if user is authenticated or not

export const isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies  
    console.log(token,"req.cookeies this is ")

 

    if(!token){  
        return next(new ErrorHandler('Login to access the resource ',404))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
});

//Handling user roles

export const authorizeRoles = (...roles)=>{

    return (req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,403)
            )

        }
        next()
    }
}