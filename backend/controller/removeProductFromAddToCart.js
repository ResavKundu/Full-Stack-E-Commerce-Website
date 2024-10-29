const cartModel=require("../models/cartProduct")
const removeProductFromAddToCart=async(req,res)=>{
   try {
    const userId=req.userId
    const currentId=req.body._id
    const deleteProduct=await cartModel.deleteOne({_id:currentId})
    // console.log(deleteProduct)
    res.json({
        data:deleteProduct,
        message:"Product Remove Successfully",
        success:true,
        error:false
    })
   } catch (error) {
     res.status(400).json({
        message:error||error.message,
        success:false,
        error:true
     })
   }
}
module.exports=removeProductFromAddToCart