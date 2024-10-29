const cartModel=require("../models/cartProduct")
const updateAddToCartProduct=async(req,res)=>{
    try {
        const userId=req.body
        const productId=req.body._id
        const qun=req.body.quantity
        // console.log("Update Add To Cart"+productId,quantity)
        const updateProduct=await cartModel.updateOne({_id:productId},{
            ...(qun && {quantity:qun})
        })
        res.json({
            message:"Update Add To Cart Successfully",
            data:updateProduct,
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
module.exports=updateAddToCartProduct