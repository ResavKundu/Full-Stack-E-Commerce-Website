const productModel=require("../models/productmodel")
const filterProductControlle=async(req,res)=>{
    try {
        const categoryList=req.body.category || []
        // console.log(categoryList)
        const product=await productModel.find({
            category:{
                "$in":categoryList
            }
        })
        res.json({
            data:product,
            message:"product",
            success:true,
            error:false
        })
    } catch (error) {
        res.status(400).json({
            message:error || error.message,
            success:false,
            error:true
        })
    }
}
module.exports=filterProductControlle