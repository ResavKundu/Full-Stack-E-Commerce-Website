const cartModel=require("../models/cartProduct")
const addToCart=async(req,res)=>{
    try {
        const currentUser=req?.userId;
        const {productId}=req?.body;
        // console.log("product id"+productId)
        const isProductAviable=await cartModel.findOne({productId,userId:currentUser })
        if(isProductAviable){
            return res.json({
                message:"Already exists in Add to cart",
                success:true,
                error:false
            })
        }
        const payload={
            productId:productId,
            quantity:1,
            userId:currentUser
        }
        const newAddToCart=new cartModel(payload);
        const saveProduct=newAddToCart.save();
        res.status(200).json({
            data:saveProduct,
            success:true,
            error:false,
            message:"Successfully Add To Cart"
        })
    } catch (error) {
        res.status(400).json({
            message:error ||error.message,
            success:false,
            error:true
        })
    }
}
module.exports=addToCart