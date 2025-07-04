import React, { useEffect } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import '../index.css';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]); // ✅ added navigate to dependency

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-32 flex justify-center items-center flex-col'>
          <div className="text-4xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className='capitalize text-lg'>{user?.name}</p>
          <p className='capitalize font-bold text-gray-500'>{user?.role}</p>
        </div>

        {/* Navigation */}
        <div>
          <nav className='grid mt-5'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
