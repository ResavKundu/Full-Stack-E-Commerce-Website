const productModel=require("../../models/productmodel")
const findOneProductId=async(req,res)=>{
   try {
      const {id}=req?.body || req?.query;
      // console.log("ID",id);
      const product=await productModel.findOne({_id:id}) ;
      // console.log("Product",product);
      res.json({
        data:product,
        message:"Successfully find Id",
        success:true,
        error:false
      })
   } catch (error) {
     res.status(400).json({
        message:error|| error.message,
        success:false,
        error:true,
     })
   }
}
module.exports=findOneProductId