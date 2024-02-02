import styled from "styled-components";
import TextStaggerAnimation from "./TextStaggerAnimation";
import { motion } from "framer-motion";
// import { useState } from "react";

const Container = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 100%;
  /* padding: 3%; */
  /* border: solid 0.1em ${(props) => props.theme.colors.light}; */
  cursor: pointer;
  color: ${(props) => props.theme.colors.light};
  background-color: transparent; // Default background color
  /* margin: 0em 0.5em; */
  text-decoration: none;
`;

// const Slide = styled(motion.div)`
//   transform-origin: top left;
//   z-index: -1;
//   position: absolute;
//   background-color: ${(props) => props.theme.colors.light};
//   width: 5em;
//   height: 100%;
// `;
// NOTE : ADD IN VIEW

// eslint-disable-next-line react/prop-types
export default function Button({ link, delay, children }) {
  // const [hover, setHover] = useState(false);
  return (
    <Container
      // initial={{
      //   scale: 0,
      // }}
      // animate={{
      //   scale: 1,
      //   transition: {
      //     type: "spring",
      //     delay: delay,
      //     damping: 10,
      //     mass: 0.8,
      //     stiffness: 100,
      //   },
      // }}
      href={link}
      whileHover={{
        // color: '#ffffff',
        scale: 1.1,
        color: "#ca0e25",
      }}
      whileTap={{
        scale: 0.9,
        color: "#ca0e25",
      }}
      transition={{
        delayChildren: delay,
      }}
      // NOTE : part of removed animation
      // onHoverStart={() => setHover(true)}
      // onHoverEnd={() => setHover(false)}
    >
      <TextStaggerAnimation delay={1} stagger={0.1} offset={0.2}>
        {children}
      </TextStaggerAnimation>
      {/* <Slide
        style={{ scale: 0 }}
        animate={{
          scale: hover ? 1 : 0,
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
      /> */}
    </Container>
  );
}
