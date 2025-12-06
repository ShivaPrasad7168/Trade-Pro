"use client"
import React, { useState } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { Zap } from 'lucide-react';

const fadeinup={
    initial:{opacity:0,y:20},
    animate:{opacity:1,y:0},
    transition:{duration:0.5},
}; 

const Header = () => {
    const [ismenuopen,setismenuopen] = useState(false)
    const [notification,setnotification]=useState(3)
    return(
        <motion.header {...fadeinup}>
            <div>
                <span>
                    Trade Pro
                </span>
                <nav>
                    <ul>
                        <li><a href="/"><Zap />Explore</a></li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    )
}
const page = () => {
  return (
    <div className='"bg-gray-900 min-h-screen text-gray-300'><Header/></div>
  )
}
export default page