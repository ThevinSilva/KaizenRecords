import styled from "styled-components";
import TextStaggerAnimation from "../lib/TextStaggerAnimation";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: start; // Align content to the top
  align-items: start; // Align content to the left
  width: 100%;
  height: 90%;
  overflow: hidden;
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.dark};
  z-index: 100;

  h2 {
    font-size: clamp(2rem, 3vw + 2.3rem, 7rem);
    margin: 0 0 20px 0; // Adjust margin to space out elements, remove if not needed
    width: 100%;
    text-align: left; // Align text to the left
    word-wrap: break-word; // Prevents overflow by breaking long words
  }
`;

export default function About() {
  const isDesktop = useMediaQuery({ query: "(min-width : 768px)" });

  return (
    <Container
      animate={{
        top: isDesktop ? "50px" : "35px",
        left: isDesktop ? "50px" : "35px",
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
    </Container>
  );
}
