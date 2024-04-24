import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../zustand/useConversations';
import useGetConversations from '../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {
  const [search,setSearch] = useState('')
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!search) return ;
    if(search.length < 3){
      return toast.error('Search must be atleat 3 characters long')
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation)
      setSearch('')
    } else {
      toast.error(`No user found with name ${search}`)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='felx items-center gap-2'>
        <input type="text" placeholder='Search' className='input input-bordered rounded-full' 
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='h-3 w-3 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput