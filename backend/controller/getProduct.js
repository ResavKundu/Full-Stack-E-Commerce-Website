const productModel = require("../models/productmodel");

async function getAllProduct(req,res) {
    try {
        // console.log("All Product",req.userId);
        const allProduct=await productModel.find().sort({createdAt:-1});
        res.json({
            message:"All Products",
            data:allProduct,
            success:true,
            error:false
        })
    } catch (error) {
        res.status(400).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
module.exports=getAllProduct