import React, { useEffect,useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import DisplayAllProduct from '../components/DisplayAllProduct';
import SummaryApi from '../../common';
import { MdEdit } from "react-icons/md";
import DisplayProductEditedByAdmin from '../components/DisplayProductEditedByAdmin';

const AllProduct = () => {
  const [openUploadProduct,setOpenUploadProduct]=useState(false);
  const [editUploadProduct,setEditUploadProduct]=useState(false);
  const [allProduct,setAllProduct]=useState([]);

const fetchAllProduct=async()=>{
    const response=await fetch(SummaryApi.getAllProduct.url,{
        method:SummaryApi.getAllProduct.method,
        credentials:"include"
    })
    const fetchData=await response.json();
    setAllProduct(fetchData?.data|| []);
    // console.log("All Product",fetchData.data)
}
useEffect(()=>{
    fetchAllProduct()
},[])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between'>
        <h2 className='font-bold text-lg p-3'>All Product</h2>
        <button className='bg-orange-600 rounded-full p-3 text-white font-bold text-lg hover:bg-lime-500 transition-all' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      
       <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)]  overflow-y-scroll'>   {/*h-[calc(100vh-190px)] */}
        {
          allProduct.map((product,index)=>{
                return(
                   <DisplayAllProduct productData={product} alt={index+"allProduct"} fetchDataa={fetchAllProduct}/>
                )
            })
        }
    </div>
      {/* upload Product Component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchDataa={fetchAllProduct} />
        )
      }
      
    </div>
  )
}

export default AllProduct