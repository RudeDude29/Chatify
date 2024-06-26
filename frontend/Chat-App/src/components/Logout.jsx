import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../hooks/useLogout';

const Logout = () => {
  const {loading,logout}= useLogout();
  return (
    <div className='mt-auto'>
        <BiLogOut className='h-6 w-6 text-white cursor-pointer'
        onClick={logout}
        />
        </div>
  )
}

export default Logout