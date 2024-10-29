import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";;
import image1 from '../assets/banner/img3.jpg'
import image2 from "../assets/banner/amzon1.jpg"
import image3 from "../assets/banner/amazon2.jpg"
import image4 from "../assets/banner/amzon3.jpg"
import image5 from "../assets/banner/amazon4.jpg"
import image6 from "../assets/banner/img2.webp"
import image7 from "../assets/banner/img1.webp"
import image8 from "../assets/banner/ima6.jpg"

import mob1 from "../assets/banner/img1_mobile.jpg"
import mob2 from "../assets/banner/img2_mobile.webp"
import mob3 from "../assets/banner/img3_mobile.jpg"
import mob4 from "../assets/banner/img4_mobile.jpg"
import mob5 from "../assets/banner/img5_mobile.png"
const BannerProduct = () => {
    const [currentImage,setSurrentImage]=useState(0)
    const desxImage=[
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
    ]
    const mobImage=[
        mob1,
        mob2,
        mob3,
        mob4,
        mob5,
        mob3,
        mob4,
        mob5
    ]
    const nextImage=()=>{
        if(desxImage.length-1>currentImage){
            setSurrentImage(prev=>prev+1)
        }
    }
    const prevImage=()=>{
        if(currentImage!=0){
            setSurrentImage(prev=>prev-1)
        }
    }
    useEffect(() => {
      const interval=setInterval(() => {
        if(desxImage.length-1>currentImage){
            nextImage()
        }else{
            setSurrentImage(0);
        }
      }, 3000);
    
      return () => clearInterval(interval)
    }, [currentImage])
    
  return (
    <>
        <div className='container mx-auto '>
           <div className='h-60 flex  justify-center md:h-72 w-full bg-slate-200  '>
           <div className='flex '>
           <div className=''>
             {
                currentImage>0 && (

                    <button className='h-full bg-rose-500 opacity-15 hover:opacity-100'
              onClick={()=>setSurrentImage((prev)=>prev-1)}
               ><FaAngleLeft className='h-full' /></button>
                )
             }
           </div>
           {/**Dextop version */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                    desxImage.map((e,index)=>{
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={e} style={{transform :`translatex(-${currentImage*100}%)`}} >
                                <img src={e} alt="amazon1" className='w-full h-full object-fill '/>
                            </div>
                        )
                    })
                   }
             
              </div>
              {/**Mobile version */}
              <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobImage.map((e,index)=>{
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={e+index} style={{transform :`translatex(-${currentImage*100}%)`}} >
                                <img src={e} alt="amazon1" className='w-full h-full'/>
                            </div>
                        )
                    })
                   }
             
              </div>
           </div>
              <div>
              {
                currentImage<desxImage.length-1 && 
                <button 
               onClick={()=>setSurrentImage((prev)=>prev+1)}
              className=' h-full bg-green-500 opacity-15 hover:opacity-100'><FaAngleRight className='h-full '/></button>
             
              }
              </div>
           </div>
        </div>
    </>
  )
}

export default BannerProduct