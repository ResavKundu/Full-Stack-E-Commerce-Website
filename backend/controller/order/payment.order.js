const stripe=require("../../config/stripe");
const userModel=require("../../models/userModel")
const paymentController=async(req,res)=>{
    try {
        const {cartItemDetails}=req.body;
        // console.log(cartItemDetails);
        if (!cartItemDetails || !Array.isArray(cartItemDetails)) {
            throw new Error("Invalid cartItemDetails");
        }
        const user=await userModel.findOne({_id:req.userId});
        if (!user) {
            throw new Error("User not found");
        }
        const  params={
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {
                    shipping_rate : 'shr_1PPNF0JyuSvgiLDCPhZV8wHV'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId : req.userId
            },
            line_items :cartItemDetails.map((item,index)=>{
                return{
                    price_data : {
                      currency : 'inr',
                      product_data : {
                        name : item.productId.productName,
                        images : item.productId.productImage,
                        metadata : {
                            productId : item.productId._id
                        }
                      },
                      unit_amount : item.productId.sellingPrice * 100
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item. quantity

                }
            }),
            success_url:`${process.env.FROENTEND_URL}/success`,
            cancel_url:`${process.env.FROENTEND_URL}/cancle`,
           }
        const sessions = await stripe.checkout.sessions.create(params);
        res.status(303).json(sessions)
    } catch (error) {
        res.json({
            message: error.message || error ,
            success: false,
            error:true
        })
    }
}
module.exports=paymentController