import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
export default function Background({children}) {
  const [isDesktop , setIsDesktop] = useState(false)
  const desktop = useMediaQuery({ query : "(min-width : 768px)"})

  useEffect(() => {
    setIsDesktop(desktop) 
  },[desktop])
  return (
    <motion.div
      style={{
        backgroundColor: "#ffffff",
        position: 'absolute',
        width: '90vw',
        height: '80vh',
        margin: 'auto', // Center horizontally and vertically
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      initial = {{ 
        height : "100%",
        width : "100%",
      }}
      
      animate = {{ 
        height : `calc(100% - ${isDesktop ? "100px" : "70px"})`,
        width : `calc(100% - ${isDesktop ? "100px" : "70px"})`,
        transition: { duration: 1 }
      }}

    >
      {children}
    </motion.div>
  )
}
