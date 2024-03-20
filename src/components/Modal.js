import React from 'react'

function Modal({isVisible, children}) {
    if(!isVisible) return null;
  return (
    <div className='fixed bg-opacity-25 inset-0 flex justify-center items-center backdrop-blur-sm z-auto'>
        <div className='bg-gray-200 max-w-[400px] w-full rounded-lg '>
           {children}
        </div>
    </div>
  )
}

export default Modal