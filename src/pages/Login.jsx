import React from 'react'
import loginIcon from "../assets/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import Context from '../context/index';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)


  

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"   
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataResponse.json();

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/');
      fetchUserDetails(); // Fetch user details after successful login
      fetchUserAddToCart(); 
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }

  console.log(data);

  return (
    <section id='login' className=' mx-auto container px-4 mt-5'>
      <div className=' bg-white p-4 w-full max-w-md mx-auto rounded-md'>
        <div className=' w-20 h-20 mx-auto'>
          <img src={loginIcon} alt="login icons" />
        </div>

        <form action="" onSubmit={handleSubmit}>
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
               type={showPassword ? "text" : "password"} id="password" name="password" placeholder='Enter Password'
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

            

            <div className=' mt-3'>
              <Link to="/forgot-password" className=' text-[13px] font-bold hover:underline hover:text-red-500'>Forgot Password?</Link>
            </div>
          </div>


          <button className=' bg-red-600 hover:bg-red-700 text-white py-2 px-6 w-full max-w-[150px] rounded-full hover:scale-105 mt-5 transition-all mx-auto block'>Login</button>
        </form>

        <div className=' mt-5'>
          <p className=' text-[13px] font-bold'>Don't have an account? <Link to={"/sign-up"} className='font-bold hover:underline hover:text-red-500'>Sign-Up</Link></p>
        </div>

      </div>
      
    </section>
  )
}

export default Login
