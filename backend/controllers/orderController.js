import Order from "../models/order.js";
import Product from "../models/product.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

//post new order => "api/v1/order/new"
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get single order => /api/v1/order/:id
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
//get logged in user orders => /api/v1/orders/me
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  console.log(orders);
  res.status(200).json({
    success: true,
    orders,
  });
});

//get admin all orders /api/v1/admin/orders

export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update process order -ADMIN => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order.orderStatus === 'Delivered') {
      return next(new ErrorHandler('You have already delivered this order', 400))
  }

  order.orderItems.forEach(async item => {
      await updateStock(item.product, item.quantity)
  })

  order.orderStatus = req.body.status,
      order.deliveredAt = Date.now()

  await order.save()

  res.status(200).json({
      success: true,
  })
})

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false })
}

// Delete order   =>   /api/v1/admin/order/:id

export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  console.log(order)

  if (!order) {
      return next(new ErrorHandler('No Order found with this ID', 404))
  }



  res.status(200).json({
      success: true
  })
})