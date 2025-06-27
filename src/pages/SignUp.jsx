import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from "../assets/signin.gif"
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      profilePic: "",
    })

    const navigate = useNavigate();

    
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value
      })
    }

    const handleUploadPic = async (e) => {
      const file = e.target.files[0];

      const imagePic = await imageTobase64(file);
      console.log("imagePic", imagePic);
      setData({
        ...data,
        profilePic: imagePic
      })
    }


    const handleSubmit = async(e) => {
      e.preventDefault();

      if (data.password === data.confirmPassword) {
        const dataResponse = await fetch(SummaryApi.signUp.url, {
          method: SummaryApi.signUp.method,
          headers: {
            "Content-Type": "application/json"   
          },
          body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if(dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        }
        if(dataApi.error){
          toast.error(dataApi.message);
          return;
        }
      } else {
      toast.error("Password and confirm password do not match");
      }

    }



  return (
    <section id='signup' className=' mx-auto container px-4 mt-5'>

      <div className=' bg-white p-4 w-full max-w-md mx-auto rounded-md'>
        <div className=' w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
          <div>
            <img src={data.profilePic || loginIcon} alt="login icons" />
          </div>
          <form>
            <label>
              <div className=' text-xs bg-slate-200  bg-opacity-90 py-4 text-center cursor-pointer absolute bottom-0 w-full'>
                 Upload Photo
              </div>
              <input type="file" className=' hidden' onChange={handleUploadPic}/>
            </label>
          </form>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className=' grid'>
            <label htmlFor="" className=' text-[18px] mt-3'>Name :</label>
            <div className=' bg-slate-100 mt-1'>
              <input onChange={handleOnChange}
              value={data.name}
              type="text" id="name" name="name" placeholder='Enter Name'
              className=' w-full h-full outline-none bg-transparent'
              required
              />
            </div>
          </div>


          <div className=' grid'>
            <label htmlFor="" className=' text-[18px] mt-3'>Email :</label>
            <div className=' bg-slate-100 mt-1'>
              <input onChange={handleOnChange}
              value={data.email}
              type="email" id="email" name="email" placeholder='Enter Email'
              className=' w-full h-full outline-none bg-transparent'
              required/>
            </div>
          </div>

          <div className=' grid mt-5'>
            <label htmlFor="" className=' text-[18px]'>Password :</label>
            <div className=' bg-slate-100 flex p-2 mt-1'>
              <input onChange={handleOnChange}
               value={data.password}
               type={showConfirmPassword ? "text" : "password"} id="password" name="password" placeholder='Enter Password'
              className=' w-full h-full outline-none bg-transparent'
              required/>

              <div className=' cursor-pointer text-xl'>
                <span>
                  {
                    showConfirmPassword ? <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                  }
                </span>
              </div>
            </div>
          </div>

          <div className=' grid mt-5'>
            <label htmlFor="" className=' text-[18px]'>Confirm Password :</label>
            <div className=' bg-slate-100 flex p-2 mt-1'>
              <input onChange={handleOnChange}
               value={data.confirmPassword}
               type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder='Enter Confirm Password'
              className=' w-full h-full outline-none bg-transparent'
              required/>

              <div className=' cursor-pointer text-xl'>
                <span>
                  {
                    showPassword ? <FaEye onClick={() => setShowPassword(!showPassword)} /> : <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                  }
                </span>
              </div>
            </div>
          </div>

          <button className=' bg-red-600 hover:bg-red-700 text-white py-2 px-6 w-full max-w-[150px] rounded-full hover:scale-105 mt-5 transition-all mx-auto block'>Sign Up</button>
        </form>

        <div className=' mt-5'>
          <p className=' text-[13px] font-bold'>Already have an account? <Link to={"/login"} className='font-bold hover:underline hover:text-red-500'>Login</Link></p>
        </div>

      </div>
      
    </section>
  )
}

export default SignUp
