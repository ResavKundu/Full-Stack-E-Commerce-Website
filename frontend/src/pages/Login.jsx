import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Login = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [data,setData]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate();
  const {fetchUserDetails,fetchUserAddToCart}=useContext(Context)
  const handleOnChange=(e)=>{
    const {name,value}=e.target;

    setData((prevdata)=>{
      return {
        ...prevdata,
        [name]: value
      }
    })
  }
  const handleSubmit=async(e)=>{
     e.preventDefault();
     const dataResponce=await fetch(SummaryApi.Login.url,{
      method:SummaryApi.Login.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(data)
     })
     const dataApi=await dataResponce.json();
     console.log("Login Data Api",dataApi);
     if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails()
        fetchUserAddToCart()
     }
     if(dataApi.error){
      toast.error(dataApi.message)
     }
  }
  //console.log(data);
  return (
    <>
      {/* <div>Login</div> */}
      <section id='login'>
        <div className='max-auto container p-4'>
          <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto border '>
            <div className='w-20 h-20 mx-auto'>
              <img src='https://w7.pngwing.com/pngs/505/761/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png' alt='login image'/>
            </div>
          
            <from className='pt-8 flex flex-col gap-2' onClick={handleSubmit}>
            <div className='grid mt-5'>
              <label >Email:</label>
              <div className='bg-slate-100 border border-transparent hover:border-sky-200 p-2 cursor-pointer rounded-sm transition-all ease-in-out duration-300'>
                 <input 
                        type='email' 
                        placeholder='Enter Email..' 
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none  bg-transparent '/>
              </div>
            </div>
            <div className='grid'>
              <label>Password:</label>
              <div className='bg-slate-100 border border-transparent hover:border-sky-200 p-2 cursor-pointer rounded-sm flex transition-all ease-in-out duration-300'>
                <input 
                        type={showPassword?"text":"password"} 
                        placeholder='Enter Password..' 
                        name='password'
                        value={data.password}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none  bg-transparent'/>
                <div className='cursor-pointer' onClick={()=>setShowPassword((preval)=>!preval)}>
                  <span>
                     { showPassword?  <FaEye />:<FaEyeSlash/>}
              
                  </span>
                </div>
              </div>
              <div>
                <NavLink to="/forgotpassword" className="block w-fit ml-auto hover:underline hover:text-red-600">Forgot Password</NavLink>
              </div>
            </div>
            <button className='bg-[#89216b] text-yellow-100 px-2 py-2 w-full max-w-[150px] rounded-full  hover:bg-[#cf34a3] border-2 border-transparent border-fuchsia-800 mx-auto block mt-4 transition-all ease-in-out duration-300 font-medium text-base' >Login</button>
          </from>
          <p className='mt-1'> Don't have account ?<NavLink to="/signup" className="hover:underline hover:text-red-600 ">Signup</NavLink></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login