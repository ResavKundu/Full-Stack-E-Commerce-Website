import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common';
import Context from '../context';
import displayINRCurrency from "../helpers/displayCurrency"
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from 'react-toastify';
import {loadStripe} from '@stripe/stripe-js';
const Cart = () => {
  const [data,setData]=useState([]);
  const [value,setValue]=useState(1);
  const [loading,setLoading]=useState(false);
  const context=useContext(Context)
  const cartArray=new Array(context.cartProductCount).fill(null);
  
  const fetchCartProduct=async()=>{
    // setLoading(true);
    const response=await fetch(SummaryApi.addToCartProductView.url,{
      method:SummaryApi.addToCartProductView.method,
      credentials:"include",
      headers : {
        "content-type" : 'application/json'
    },
    })
    const responseData=await response.json();
   
    if(responseData.success){
      setData(responseData.data);
    }
    setLoading(false);
    // console.log("responseData",responseData.data);
  }

  {/**Update Cart Product */}

  const updateCartProduct=async(productId,qty)=>{
    const response=await fetch(SummaryApi.updateAddtoCartProduct.url,
      {
      method:SummaryApi.updateAddtoCartProduct.method,
      credentials:"include",
      headers:{
         "content-type":"application/json"
      },
        body:JSON.stringify({
          quantity:qty+1,
          _id:productId
        })
      
    })
    const responseData=await response.json()
    console.log(responseData)
    if(responseData.success){
      toast.success(responseData?.message)
      fetchCartProduct()
  }
  if(responseData.error){
      toast.error(responseData?.message)
  }
  }

  {/**Decrease Cart Product */}
  const decreaseCartProduct=async(productId,qty)=>{
    const response=await fetch(SummaryApi.updateAddtoCartProduct.url,
      {
      method:SummaryApi.updateAddtoCartProduct.method,
      credentials:"include",
      headers:{
         "content-type":"application/json"
      },
        body:JSON.stringify({
          quantity:qty-1,
          _id:productId
        })
      
    })
    const responseData=await response.json()
    console.log(responseData)
    if(responseData.success){
      toast.success(responseData?.message)
      fetchCartProduct()
  }
  if(responseData.error){
      toast.error(responseData?.message)
  }
  }
  {/**Delete Product */}
  const deleteCartProduct=async(id)=>{
      const response=await fetch(SummaryApi.removeProductFromAddToCart.url,{
         method:SummaryApi.removeProductFromAddToCart.method,
         credentials:"include",
         headers:{
          "content-type":"application/json"
         },
         body:JSON.stringify({
          _id:id,
         })
      })
      const responseData=await response.json()
      if(responseData.success){
        // toast.success(responseData?.message)
      fetchCartProduct()
      context.fetchUserAddToCart()

      }
      if(responseData.error){
        toast.error(responseData?.message)
    }
  }
  {/**Handle Payment */}
  const handlePayment=async()=>{
    const stripePromise =await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISH_KEY);
     const response=await fetch(SummaryApi.payment.url,{
      method:SummaryApi.payment.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
       },
      body:JSON.stringify({
        cartItemDetails:data
      })
     })
     const responseData=await response.json();
     if(responseData?.id){
      stripePromise.redirectToCheckout({sessionId:responseData.id});
     }
     console.log("Response Data Cart",responseData)
  }
  // console.log(data[0].productId.sellingPrice)
  const totalPrice=data.reduce((container,iter)=>iter.quantity*(iter?.productId?.sellingPrice)+container,0);
  const mrpPrice=data.reduce((container,iter)=>iter.quantity*(iter?.productId?.price)+container,0);
  const discount=mrpPrice-totalPrice;
  useEffect(()=>{
    fetchCartProduct()
    // updateCartProduct()
  },[])
  return (
    <>
       <div className='container mx-auto bg-slate-100'>
        <div className='text-center text-lg my-3'>
            {
              data.length ===0 && !loading&&(
                <p className='bg-white- py-5'>No Data</p>
              )
            }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between' >
           {/**View Product */}
           <div className='w-full max-w-3xl'>
              {
                loading ? (
                  data.map((e)=>{
                    return (
                      <div key={e+"Add To cart loading"} className='w-full bg-slate-200 h-32 my-2 border rounded border-slate-300 animate-pulse'>
                         
                      </div>
                    )
                  })
                    
                ) :(
                  data.map((e,index)=>{
                    return (
                      <div key={e._id+"Add To cart loading"} className='w-full bg-white h-32 my-2 border rounded border-slate-300 '>
                         <div className='flex'>
                          <div className='w-28 h-28 m-2 border shadow-md'>
                              <img src={e.productId.productImage[0]} className='w-full h-full object-contain mix-bland-multiply hover:scale-105'/>
                          </div>
                          <div className='m-2 ml-5 w-full'>
                              <div className='font-semibold text-ellipsis line-clamp-1'>{e.productId.productName}</div>
                              <div className='text-orange-600'>{e.productId.brandName}</div>
                              <div className='flex justify-between '>
                                  <div className='flex gap-5'>
                                    <div className='line-through text-sm text-slate-400 p-1'>₹{e.productId.price}</div>
                                    <div className='text-lg font-bold text-rose-500'>₹{e.productId.sellingPrice}</div>
                                    <div className='text-sm text-green-600 pb-2'>{Math.round(((e.productId.price-e.productId.sellingPrice)/e.productId.price)*100)}% off</div>
                                  </div>
                                  <div className='flex ml-5 '>
                                    {
                                      e.quantity<2 ?(
                                        <CiCircleMinus className='m-0.5 text-xl cursor-pointer text-slate-300'/>
                                      ):(
                                        <CiCircleMinus 
                                    onClick={()=>decreaseCartProduct(e._id,e.quantity)}
                                    className='m-0.5 text-xl cursor-pointer'/>
                                      )
                                    }
                                    {/* <input 
                                      value={value}
                                      // onChange={(e)=>setValue(e.target.value)}
                                      onChange={()=>updateCartProduct(e._id)}
                                      type='number' className='w-14 border'/> */}
                                    <span>{e.quantity}</span>
                                    <CiCirclePlus 
                                    onClick={()=>updateCartProduct(e._id,e.quantity)}
                                    className='m-0.5 text-xl cursor-pointer'/>
                                </div>
                              </div>
                              <div className='mt-1 flex gap-5 cursor-pointer font-semibold'>
                                 <div className='hover:text-blue-700 text-sm '>SAVE FOR LATER</div>
                                 <div className='hover:text-blue-700 text-sm ' onClick={()=>deleteCartProduct(e._id)}>REMOVE</div>
                              </div>
                          </div>
                          <div className='bg-rose-500 '>
                             
                          </div>
                         </div>
                      </div>
                    )
                  })
                )
              }
           </div>
           {/**Total Prodduct */}
           {
             data[0] &&(
                  <div className='mt-5 lg:mt-0 w-full max-w-sm'>
              {
              loading ? (
                  <div className='h-36 bg-slate-200 border animate-pulse'></div>
                ):(
                  <div className='h-60 bg-white border p-4 sticky top-[54px]'>
                    <div className='font-bold p-1 text-2xl'>PRICE DETAILS</div>
                    <hr className='text-slate-600 p-2'></hr>
                    <diV className='text-gray-500 font-semibold text-md flex justify-between'>
                      <div>Price {data.length} items</div>
                      <div>{displayINRCurrency(mrpPrice)}</div>
                    </diV>
                    <div className='flex justify-between text-gray-500 font-semibold mt-3'>
                      <div className=''>Discount</div>
                      <div className='text-green-600'>-{displayINRCurrency(discount)}</div>
                    </div>
                    <div className='flex justify-between text-gray-500 font-semibold mt-3'>
                      <div className=''>Delivery Charges</div>
                      <div className='text-green-600'>
                        {
                          totalPrice>500 ? (
                            <span>Free</span>
                          ):(<span>₹50</span>)
                        }
                      </div>
                    </div>
                    <hr className='text-slate-600 m-2'></hr>
                    <div className='flex justify-between  font-semibold mt-3'>
                      <div className='text-gray-950 text-2xl'>Total Amount</div>
                      <div className='text-gray-950 text-2xl'>{displayINRCurrency(totalPrice)}</div>
                    </div>
                    
                  </div>
                  
                )
              }
              <div className='bg-red-500 p-2 text-xl font-semibold flex justify-center text-white cursor-pointer hover:bg-red-600 ' onClick={handlePayment}>Make Payment</div>
              </div>
             )
           }
           
           
        </div>
       </div>
    </>
  )
}

export default Cart