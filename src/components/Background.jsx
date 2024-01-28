import { motion } from 'framer-motion'

// eslint-disable-next-line react/prop-types
export default function Background({children}) {
  return (
    <motion.div
      style={{
        backgroundColor:"#ffffff",
        position: 'absolute',
        width: '100vw',
        height: '100vh'
      }}
      initial = {{ 
        scale : 1
      }}
      
      animate = {{ 
        scale : 0.88,
        transition: { duration: 1 }
      }}

    >
      {children}
    </motion.div>
  )
}
