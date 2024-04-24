import React from 'react'
import Sidebar from '../../components/Sidebar'
import MessagesContainer from '../../components/messages/MessagesContainer'
const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-gray-800'>
        <Sidebar/>
        <MessagesContainer/>
    </div>
  )
}

export default Home