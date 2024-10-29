const jwt=require("jsonwebtoken")
async function authToken(req,res,next) {
    try {
        const token=req.cookies?.token ;

        if(!token){
            return res.status(200).json({
                message: "user not login",
                error: true,
                success:false
            })
        }
        jwt.verify(token,process.env.TOKEN_SECKET_KEY,function(error,decoded){
            console.log(error);
            console.log(decoded);

            if(error){
                console.log("Error auth",error)
            }
            req.userId=decoded?._id
            next()
        })
        console.log(token)
    } catch (error) {
        req.status(400).json({
            message:error.message||error,
            data:[],
            error:true,
            success:false
        })
    }
}
module.exports=authToken