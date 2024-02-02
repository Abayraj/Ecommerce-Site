import Product from "../models/product.js";

///Create new product =>/api/v1/admin/product/new
export const  newProduct = async (req,res,next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });


} ;
///Get all products =>/api/v1/products
export const  getProducts = async (req,res,next) =>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        message:"This route will show all products in database",
        count:products.length,
        products
    });
};

//Get a single product details using id  => /api/v1/product/:id


export const getSingleProduct = async (req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
        })
    }

    res.status(200).json({
        success:true,
        message:'product found',
        product
    })

};

//Update product => /api/v1/admin/product/:id

export const updateProduct = async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
        });
    };


    product = await  Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
};





