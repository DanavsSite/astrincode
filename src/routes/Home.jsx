import React from 'react'
import {motion, transform} from 'framer-motion'
function Home() {
  return (
    <motion.div 
    className='bg-blue-200 h-screen z-100'
    initial={{
        height:0
    }}
    animate={{
        height:'100vh'
    }}
    exit={{
        y:'-100vh',
        display:'none'		
    }}
    transition={{
        duration:1
    }}
    >
        <h1>Coming Soon................</h1>
    </motion.div>
  )
}

export default Home