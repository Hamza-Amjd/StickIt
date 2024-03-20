import React from 'react'
import { FaSearch } from 'react-icons/fa'
export default function Search({setsearchQuery,search}) {
    
  return (
    <div className='flex flex-row bg-gray-200 p-2 w-auto  rounded-2xl text-gray-700'>
            <button onClick={()=>search()}><FaSearch  className='m-1' /></button>
            <input type='search'  placeholder='search' onChange={(e)=>setsearchQuery(e.target.value)} className='w-full bg-gray-200 focus:outline-none'/>
            
        </div>
  )
}
