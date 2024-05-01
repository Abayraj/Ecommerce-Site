
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Cart from "../models/cart.js";


export const cartAdd = catchAsyncErrors(async (req, res, next) => {
    const { color, quantity, productid } = req.body;
    const userId = req.user.id;
    
    // Check if there's an existing cart entry for the same product and color
    let existingCart = await Cart.findOne({ user: userId, productid, color });

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
        const newCart = await Cart.create({
            quantity,
            user: userId,
            productid,
            color,
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
    
    const userCartProducts = await Cart.find({ user: userId }).populate('productid');
    console.log(userCartProducts,"userCart")
    res.status(200).json({
        success:true,
        userCartProducts
    
    })


});

export const cartItemsQuantityUpdate = catchAsyncErrors(async(req,res,next)=>{
   const {cartId} =  req.params;
   const {quantity} = req.body;
   console.log(quantity,"quantityyy")
   console.log(cartId,"cartId")
   const updatedCartItem = await Cart.findOneAndUpdate(
    { _id: cartId },
    { $set: { quantity: quantity } },
    { new: true } // This option returns the modified document
  );
   if(!updatedCartItem) {
    return res.status(404).json({message:'cart item not found for update'})
   }
   res.status(200).json({
    success:true,
  

})
})

