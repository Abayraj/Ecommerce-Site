import Product from "../models/product.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFeatures from "../utils/apiFeatures.js";

///Create new product =>/api/v1/admin/product/new
export const newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

///Get all products =>/api/v1/products?keyword=apple
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
  .search()
  const products = await apiFeatures.query;
  if (!products) {
    return next(new ErrorHandler("Products not found check database", 404));
  }
  res.status(200).json({
    success: true,
    message: "This route will show all products in database",
    count: products.length,
    products,
  });
});

//Get a single product details using id  => /api/v1/product/:id

export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product found",
    product,
  });
});

//Update product => /api/v1/admin/product/:id

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found for update", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product => /api/v1/admin/product/:id

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found for delete", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
