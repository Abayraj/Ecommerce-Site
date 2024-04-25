import cart from "../models/cart.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";


export const cartAdd = catchAsyncErrors(async (req, res, next) => {
    const { color, quantity, productid } = req.body;
    const userId = req.user.id;
    
    // Check if there's an existing cart entry for the same product and color
    let existingCart = await cart.findOne({ user: userId, productid, color });

    if (existingCart) {
        // If a cart entry exists with the same product and color, update its quantity
        existingCart.quantity += quantity;
        await existingCart.save();
        res.status(200).json({
            success: true,
            existingCart,
        });
    } else {
        // If no cart entry exists with the same product and color, create a new cart entry
        const newCart = await cart.create({
            color,
            quantity,
            user: userId,
            productid,
            // description,
            // productName,
            // price


        });
        res.status(201).json({
            success: true,
            newCart,
        });
    }
});

export const getUserCartProducts = catchAsyncErrors(async(req,res,next)=>{
    const userId = req.user.id;
    
    const userCartProducts = await cart.find({ user: userId });
    console.log(userCartProducts,"userCart")
    res.status(200).json({
        success:true,
        userCartProducts
    
    })


});

