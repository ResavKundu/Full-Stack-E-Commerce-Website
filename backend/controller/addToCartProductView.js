const cartModel=require("../models/cartProduct")
const addToCartProductView=async(req,res)=>{
    try {
        const currentUser=req.userId;
        const product=await cartModel.find({
            userId:currentUser
        }).populate("productId")
        res.json({
            data:product,
            success:true,
            error:false
        })
    } catch (error) {
        res.status(400).json({
            message:error|| error.message,
            error:true,
            success:false
        })
    }
}
module.exports=addToCartProductView