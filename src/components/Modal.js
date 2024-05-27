import React from 'react'
import {motion} from 'framer-motion' 
function Modal({isVisible, children}) {
    if(!isVisible) return null;
  return (
    <div className={`fixed inset-0 flex justify-center items-center backdrop-blur-sm z-30 transition-colors ${isVisible ? "visible bg-black/20":"invisible" }`}>
        <motion.div initial={{ opacity:0}} animate={{opacity:1}}  className={`bg-gray-200 max-w-[400px] rounded-lg transition-all ${isVisible?"scale-100 opacity-100":"scale-125 opacity-0"}`}>
           {children}
        </motion.div>
    </div>
  )
}

export default Modal