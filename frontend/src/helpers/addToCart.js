import {toast} from "react-toastify"
import SummaryApi from "../../common/index"
const addToCart=async(e,id)=>{
  e?.stopPropagation()
  e?.preventDefault()
  const response=await fetch(SummaryApi.getAddToCartProduct.url,{
    method:SummaryApi.getAddToCartProduct.method,
    credentials : 'include',
    headers : {
        "content-type" : 'application/json'
    },
    body:JSON.stringify(
      {  productId:id}
    )
  })
  const responseData=await response.json();
  console.log("ResponseData",responseData)
  if(responseData.success){
    toast.success(responseData.message)
  }
  if(responseData.error){
    toast.error(responseData.message)
  }
  return responseData
}
export default addToCart