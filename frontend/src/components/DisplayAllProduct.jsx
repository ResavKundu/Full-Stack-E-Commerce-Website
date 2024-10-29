import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common';
import { MdEdit } from "react-icons/md";
import DisplayProductEditedByAdmin from './DisplayProductEditedByAdmin';
import DisplayImage from './DisplayImage';


const DisplayAllProduct = ({
    productData,
    fetchDataa
}) => {
const [editUploadProduct,setEditUploadProduct]=useState(false);
const [fullScreenImage,setFullScreenImage]=useState(false)
console.log("allProduct",productData)
  return (
    
                    <div className='bg-white p-4 rounded border '>
                        <div className='w-40'>
                            <div className='w-32 h-32 flex justify-center items-center cursor-pointer'
                                onClick={()=>{setFullScreenImage(true)}}
                            >
                            <img src={productData.productImage[0]} className='w-full mx-auto object-fill h-full'/>
                            </div>
                            <div className='text-ellipsis line-clamp-2 flex justify-between'>
                                <div className='max-w-28'>
                                     <h1 className='text-ellipsis line-clamp-2'>{productData.productName}</h1>
                                     <h1 className='text-rose-500 font-bold'>₹{productData.sellingPrice}</h1>
                                </div>
                                <div className=' max-h-6 w-fit mt-auto bg-green-300 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditUploadProduct(true)}>
                                  <MdEdit className='m-1'/>
                                </div>
                               
                            </div>
                        </div>
                        {
                        editUploadProduct && (
                            <DisplayProductEditedByAdmin 
                                        fetchData={productData} 
                                        // key={index+"allProduct"} 
                                        onClose={()=>setEditUploadProduct(false)} 
                                        getAllProduct={fetchDataa}/>
                        )
                       }

                       {/* Display Full Screen image */}
                       {
                            fullScreenImage && (
                                <DisplayImage  imgUrl={productData.productImage[0]} onClose={()=>{setFullScreenImage(false)}}/>
                            )
                        }
                    </div>
                   
                )
           
  
}

export default DisplayAllProduct