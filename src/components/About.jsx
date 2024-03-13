// import TextStaggerAnimation from "../lib/TextStaggerAnimation";
import styled from "styled-components";
import TextStaggerAnimation from "../lib/TextStaggerAnimation";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Centered = styled(motion.div)`
  position: absolute;
  display: flex;
  /* flex-direction: column; // This will stack children vertically
  justify-content: center; // This will center children vertically in the container
  align-items: center; // This will center children horizontally in the container */
  width: 100%;
  height: 90%; // This will take the full height of the viewport
  overflow: hidden;

  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.dark};
  display: block;
  z-index: 100;
  font-size: 5em;

  @media (max-width: 1200px) {
    font-size: 3em !important;
  }

  @media (max-width: 500px) {
    font-size: 2em !important;
  }
`;

export default function About() {
  const [isDesktop, setIsDesktop] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width : 768px)" });

  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);
  return (
    <Centered
      //   initial={{
      //     top: "0px",
      //     left: "10px",
      //   }}
      animate={{
        top: `${isDesktop ? "50px" : "35px"}`,
        left: `${isDesktop ? "50px" : "35px"}`,
        height: `calc(100% - ${isDesktop ? "100px" : "70px"})`,
        width: `calc(100% - ${isDesktop ? "100px" : "70px"})`,
        transition: { duration: 1 },
      }}
    >
      <TextStaggerAnimation>
        Rooted in the Japanese philosophy of KAIZEN (改善) meaning 'continuous
        improvement'.
      </TextStaggerAnimation>
      <TextStaggerAnimation>
        High-performance marketing. Full ownership rights for artists. No
        Bullsh*t.
      </TextStaggerAnimation>
    </Centered>
  );
}
