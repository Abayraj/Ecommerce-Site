import Product from "../models/product.js";

///Create new product =>/api/v1/product/new
export const  newProduct = async (req,res,next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });


} ;
///Create get products =>/api/v1/product/new
export const  getProducts = (req,res,next) =>{
    res.status(200).json({
        success:true,
        message:"This route will show all products in database"
    });
};

export const deleteProducts =(req,res,next) =>{
    res.status(204).json({
        success:true,
        message:"This route will delete selected product in database"
    });
};