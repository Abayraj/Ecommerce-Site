import User from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";


//Register a user => /api/v1/register

export const registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'"asdfasf"',
            url:'"dfsadf434"'
        }
    }) 

    res.status(201).json({
        success:true,
        user
    })

})