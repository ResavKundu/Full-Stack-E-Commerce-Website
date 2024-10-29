import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiChevronUp } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import SummaryApi from '../../common';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import Context from '../context';
import addToCart from '../helpers/addToCart';
const DisplayFullProduct = ({
  props
}) => {
  const [isHovered,setIsHovered]=useState(false);
  const [hoverImage,setHoverImage]=useState(false);
  const [matchedUser,setProduct]=useState();
  const [hoverBigImage,setHoverBigImage]=useState(false)
  const[image,setImage]=useState("");
  const {fetchUserAddToCart}=useContext(Context)
  const handleAddToCart=async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
  }
  const hoverEnterInBigImage=()=>{
    setHoverBigImage(true);
  }
  const hoverLeaveInBigImage=()=>[
    setHoverBigImage(false)
  ]
  const handleMouseEnterImage=(prev)=>{
    setHoverImage(true);
    setImage(prev);
  }
  const handleMouseLeaveImage=()=>{
    setHoverImage(true);
  }
  const handleMouseEnter=()=>{
    setIsHovered(true);
  }
  const handleMouseLeave=()=>{
    setIsHovered(false);
  }
  const {id} =useParams();
  console.log("Id ",id)
  
  // const todos=useSelector(state=>state?.user?.product);
  // const matchedUser = todos.find(prev => prev._id === id);
  // console.log(todos);
  const fetchProduct=async()=>{
    const response=await fetch(SummaryApi.getProductId.url,{
      method:SummaryApi.getProductId.method,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        id:id
      })
    })
    const responseData=await response.json()
    setProduct(responseData.data);
    console.log("Data Id",responseData)
  }
  useEffect(()=>{
    fetchProduct()
  },[])
  return (
    <>
        <div className=' top-0 bottom-0 left-0 right-0 pb-16 relative'>
        {
          matchedUser? (
            <div  className='flex item-center justify-center'>
               <div className='m-4  '>
                  {
                      matchedUser?.productImage?.length>1 ? (

                        matchedUser.productImage.map((prev,index)=>{
                          return(
                            <div className='flex flex-col shadow-lg transition transform duration-300 focus:ring cursor-pointer'
                            onMouseEnter={()=>handleMouseEnterImage(prev)}
                            onMouseLeave={handleMouseLeaveImage}
                            >
                              <img src={prev} alt={index+"productImage"} className='max-w-[60px] max-h-[80px] m-2 p-2  bg-slate-100 ' />
                            </div>
                          )
                        })
                      )
                      :
                      (
                        <div>
                            <div className=' bg-slate-100 p-5 shadow-lg'>
                              <img src={matchedUser.productImage[0]} alt={matchedUser.productName} className='w-32 w-32  bg-slate-100'></img>
                            </div>
                            
                        </div>
                      )
                }
                
               </div>
               {/**Big Imag */} 
               <div className=' min-h-[60vh] min-w-[500px] w-96 ml-10  '>
                  <div className='w-[400px] h-[700px]  bg-white 
                   
                  '>
                    {
                      hoverImage? (<div className='mx-auto border shadow-md m-6 p-4 h-full w-full object-fill'>
                                    <img src={image} alt={matchedUser.productName} className='h-full w-full  object-scale-down mix-blend-multiply'
                                      onMouseEnter={hoverEnterInBigImage}
                                      onMouseLeave={hoverLeaveInBigImage}
                                    />
                                    {/**Product Zoom */}
                                    {hoverBigImage? 
                                   ( <div className='hidden lg:block z-40 absolute min-w-[800px] min-h-[800px] m-9 top-0 left-[962px]'> 
                                        <div className='h-full w-full min-w-[800px] min-h-[800px] bg-white mix-blend-multiply '
                                        style={{
                                          backgroundImage:`url(${image})`,
                                          backgroundRepeat:'no-repeat'
                                        }}
                                        >
                                            
                                        </div>
                                    </div>):""}
                    </div>) 
                    :
                    (
                      <div className='mx-auto  border m-6 p-4  h-full w-full'>
                                    <img src={matchedUser.productImage[0]} alt={matchedUser.productName} className='h-full w-full object-scale-down mix-blend-multiply'
                                      onMouseEnter={hoverEnterInBigImage}
                                      onMouseLeave={hoverLeaveInBigImage}
                                    ></img>
                                    {/**Product Zoom */}
                                    {hoverBigImage? 
                                    (<div className='hidden lg:block absolute z-40 min-w-[800px] min-h-[800px] m-9 top-0 left-[962px]'> 
                                    <div className='h-full w-full min-w-[800px] min-h-[800px] bg-white mix-blend-multiply '
                                        style={{
                                          backgroundImage:`url(${matchedUser.productImage[0]})`,
                                          backgroundRepeat:'no-repeat'
                                        }}
                                        >
                                            
                                        </div>
                                    </div>):""}
                    </div>
                    )
                    
                    
                    }
                    
                  </div>
                  
                  <div className=' flex justify-between mr-24 mt-6 gap-5'>
                        <span className='flex bg-yellow-500 p-3 rounded-md hover:bg-orange-600 hover:drop-shadow-2xl text-white font-bold '>
                            <FaShoppingCart  className='m-1'/>
                            <button onClick={(prev)=>handleAddToCart(prev,matchedUser?._id)}>ADD TO CART</button>
                        </span>
                        <span className='flex bg-orange-500 p-3 rounded-md hover:bg-orange-600 hover:drop-shadow-2xl text-white font-bold'>
                           <GiElectric className='m-1'/>
                           <button>BUY NOW</button>
                        </span>
                  </div>
                </div>
               <div className='bg-white m-9 p-4 w-[800px] min-w-[300px]'>
                     <div className='text-4xl font-semibold '>{matchedUser.productName}</div>
                     <h1 className='pb-2 text-slate-400 capitalize'>{matchedUser.category}</h1>
                     <div className='text-green-600 font-medium pb-2'>Special price</div>
                      <div className='flex gap-5 pb-5'>
                         <h1 className='text-red-600 text-5xl font-semibold '>₹{matchedUser.sellingPrice}</h1>
                         <h1 className='line-through text-slate-400 p-2'>₹{matchedUser.price}</h1>
                         <div className='text-sm text-green-600 p-2'>{Math.round(((matchedUser.price-matchedUser.sellingPrice)/matchedUser.price)*100)} % off</div>
                         <div className='pt-2 cursor-pointer' >
                           <div className='rounded-full left-1 bottom-0 border p-1 text-xs'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                           ><HiChevronUp /></div>
                         </div>
                      </div>
                     
                      <button className="     focus:ring ">
                        Save changes
                      </button>
                </div> 
                {/** POP Up */}
                {
                    isHovered &&(
                      <div className='bg-white border bottom-90 left-[1250px] right-[50]  absolute top-60 p-4 drop-shadow-2xl transition delay-150'>
                        <div className='font-bold'>Price details</div>
                        
                        <div className='flex justify-between text-slate-400'>
                            <div className='flex flex-col'><div className='pb-0 mb-0'>Maximum Retail Price</div><span className='text-xs '>(incl. of all taxes)</span></div>
                            <div className='line-through'>₹{matchedUser.price}</div>
                        </div>
                        <div className='flex justify-between text-slate-400'>
                           <div >Selling Price</div>
                           <div className='line-through '>₹{matchedUser.sellingPrice}</div>
                        </div>
                        <hr className="border-t border-gray-300 mb-1 mt-2" />
                        <div className='flex justify-between'>
                            <div className='font-medium'>Selling Price</div>
                            <div className='font-medium'>₹{matchedUser.sellingPrice}</div>
                        </div>
                        <hr className="border-t border-gray-300 mb-1 mt-2" />
                        <div className='mt-2 text-green-900'>
                            <div className='text-sm'>Overall you save ₹{matchedUser.price-matchedUser.sellingPrice} ({Math.round(((matchedUser.price-matchedUser.sellingPrice)/matchedUser.price)*100)}%) on this product</div>
                        </div>
                      </div>
                    )
              }  
            </div>
            
          ):<p>No user</p>
        }
         <CategoryWiseProductDisplay category={matchedUser?.category} heading={"Popular's products"}/>
        
       </div> 
       
    </>
  )
}

export default DisplayFullProduct