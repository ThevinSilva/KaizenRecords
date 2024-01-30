import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Container = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 100%;
  /* padding: 3%; */
  border: solid 0.1em ${props => props.theme.colors.accent};
  cursor: pointer;
  color: ${props => props.theme.colors.accent};
  background-color: transparent; // Default background color
  margin: 0em 0.5em;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;

`;

const Slide = styled(motion.div)`
  transform-origin: top left;
  z-index: -1;
  position: absolute;
  background-color: ${props => props.theme.colors.accent};
  width: 5em;
  height: 100%;

`

// NOTE : ADD IN VIEW 

// eslint-disable-next-line react/prop-types
export default function Button({ link, delay, children }) {
  const [hover, setHover] = useState(false)
  return (
    <Container
      initial={{
        scale:0
      }}
      animate={{
        scale: 1,
        transition:{
          type: "spring",
          delay: delay,
          damping: 10,
          mass: 0.8,
          stiffness: 100,
      }}}
      href={link}
      whileHover={{
        color: '#ffffff'
      }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      {children}
      <Slide
        style={{scale:0}}
        animate={{
          scale: hover ? 1 : 0,
          transition:{
            ease: "easeInOut",
            duration : 0.2
          }
        }}
      />
    </Container>
  )
}
