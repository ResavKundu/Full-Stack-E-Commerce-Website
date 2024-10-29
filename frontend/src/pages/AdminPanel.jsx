import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUser } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../../common/role';

const AdminPanel = () => {
    const user=useSelector(state=>state?.user?.user);
    // console.log("Admin User",user);
    const navigate=useNavigate()
    useEffect(()=>{
        if(user?.role!==ROLE.ADMIN){
            navigate("/home");
        }
    })
  return (
    <>
        <div className=' min-h-[calc(100vh-120px)] md:flex hidden '>
            <aside className='min-h-full w-full max-w-60 bg-white m-2 p-2 '>
                <div className='bg-orange-400 rounded-full flex justify-center m-2 p-3'>
                {
                        user?.profilepic? (
                            <div >
                                <img src={user?.profilepic} className='rounded-full'/>
                            </div>) 
                        : <div className='text-9xl '><FaUser /></div>
                    }
                </div>
                <p className='capitalize text-lg font-semibold p-2'>{user?.name}</p>
                <p className='capitalize text-lg font-semibold p-2'>{user?.role}</p>

                {/* navigation */}
                <div>
                    <nav className='flex flex-col'>
                        <NavLink to="all-users" className="hover:text-orange-500 hover:underline p-2">All Users</NavLink>
                        <NavLink to={"all-product"} className="hover:text-orange-500 hover:underline p-2">All Product</NavLink>
                    </nav>
                </div>
            </aside>
            <main className='w-full h-full p-4'>
              <Outlet />   
            </main>
           
        </div>
        
          
        
        
    </>
  )
}

export default AdminPanel