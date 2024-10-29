const productModel=require("../../models/productmodel")

const getCategoryWiseProduct=async(req,res)=>{
    try {
        // console.log("Respone",req);
        const {category} =req?.body || req?.query
        const product=await productModel.find({ category})
        res.json({
            data:product,
            message:"Product get Successfully",
            success:true,
            error:false
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            success: false,
            error:true,
        })
    }
}

module.exports=getCategoryWiseProduct
