import cart from "../models/cart.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";



export const cartAdd = catchAsyncErrors(async(req,res,next)=>{
    const {color,quantity,user,productid} = req.body;
    const newCart = await cart.create({
        color,
        quantity,
        user,
        productid
    });
    res.status(201).json({
        success: true,
        productid,
      });

 
});