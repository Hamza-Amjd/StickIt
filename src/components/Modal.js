import React from 'react'

function Modal({isVisible, children}) {
    if(!isVisible) return null;
  return (
    <div className={`fixed inset-0 flex justify-center items-center backdrop-blur-sm z-30 transition-colors ${isVisible ? "visible bg-black/20":"invisible" }`}>
        <div className={`bg-gray-200 max-w-[400px] rounded-lg transition-all ${isVisible?"scale-100 opacity-100":"scale-125 opacity-0"}`}>
           {children}
        </div>
    </div>
  )
}

export default Modal