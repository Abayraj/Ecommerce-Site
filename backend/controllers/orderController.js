 import Order from"../models/order.js"
 import Product from "../models/product.js"
 import { ErrorHandler } from "../utils/errorHandler.js"
 import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"


export const newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    }=req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id

    })

    res.status(200).json({
        success:true,
        order:order
    })
})

  