import React, { useEffect } from 'react'
import { useState } from 'react'
import SummaryApi from '../common'
import '../App.css'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]) 
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  })

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(SummaryApi.all_users.url, {
      method: SummaryApi.all_users.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
      toast.error(dataResponse.message)
    }

  }

  useEffect(() => {
    fetchAllUsers()

  }, [])
  return (
    <div className=' bg-white pb-4'>
      <table className="w-full userTable">
        <thead>
          <tr className=' bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((el, index) => (
              <tr key={el._id || index}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>
                  <button className=' '>
                    <MdModeEdit className=' bg-green-100 hover:bg-green-500 rounded-full text-3xl p-1 hover:text-white' 
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}/>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>


      {
        openUpdateRole && (
          <ChangeUserRole onClose={() => setOpenUpdateRole(false)} 
           name={updateUserDetails.name}
           email={updateUserDetails.email}
           role={updateUserDetails.role}
           userId={updateUserDetails._id}
           callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers
