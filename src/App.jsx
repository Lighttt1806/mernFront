import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import SummaryApi from './common'
import Context from './context/index'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

const App = () => {
  AOS.init();
  const dispatch = useDispatch(); 
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async() =>{

    const dataResponse = await fetch(SummaryApi.current_user.url,  {
      method : SummaryApi.current_user.method,
      credentials: 'include', // Include cookies in the request
    })

    const dataAppi = await dataResponse.json();

    if(dataAppi.success){
      dispatch(setUserDetails(dataAppi.data));
    }
  }

 const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addTocartProductCount.url,{
      method : SummaryApi.addTocartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() =>{
    
    fetchUserDetails();
     
    fetchUserAddToCart();
  },[])
  return (
    <div>
      <Context.Provider value={{
        fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
        }}>
        <ToastContainer position='top-center'/>
      
        <Header />
        <main className=' min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>

    </div>
  )
}

export default App
