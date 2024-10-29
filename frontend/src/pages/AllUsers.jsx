import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { toast } from 'react-toastify'
import moment from "moment"
import { CiEdit } from "react-icons/ci";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser,setAllUsers]=useState([])
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })

  const fetchAllUsers=async ()=>{
    const fetchData=await fetch(SummaryApi.allUser.url,{
      method :SummaryApi.allUser.method,
      credentials:'include'
    })
    const dataResponse= await fetchData.json();
   console.log("All Users",dataResponse.data);
   if(dataResponse.success){
    setAllUsers(dataResponse.data);
   }
   if(dataResponse.error){
    toast.error(dataResponse.error)
   }
  }
  useEffect(()=>{
   fetchAllUsers()
  },[])
  return (
    <>
      <div>
        <table className='w-full userTable'>
          <thead>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
            </tr>
           
          </thead>
          <tbody>
            {
              allUser.map((el,index)=>{
                return (
                      <tr>
                        <td>{index+1}</td>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.role}</td>
                        <td>{moment(el.createdAt).format('L')}</td>
                        <td>
                          <button className=' text-3xl bg-green-200 rounded-full hover:bg-green-600 hover:text-white '
                          onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)

                                    }}
                          ><CiEdit /></button>
                        </td>
                      </tr>
                )
              })
            }
          </tbody>
        </table>
        {openUpdateRole &&( <ChangeUserRole
           onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
        />)}
      </div>
    </>
  )
}

export default AllUsers